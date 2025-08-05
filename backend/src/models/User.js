const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/database');
const { USER_ROLES, ROLE_PERMISSIONS, hasPermission } = require('../../../shared/constants/roles');

const User = sequelize.define('User', {
  ID: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  user_login: {
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 60],
      is: /^[a-zA-Z0-9_-]+$/
    }
  },
  user_pass: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      len: [6, 255]
    }
  },
  user_nicename: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: ''
  },
  user_email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  user_url: {
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  user_registered: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  user_activation_key: {
    type: DataTypes.STRING(255),
    defaultValue: ''
  },
  user_status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '0=inactive, 1=active, 2=suspended, 3=banned'
  },
  display_name: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  user_role: {
    type: DataTypes.ENUM,
    values: Object.values(USER_ROLES),
    defaultValue: USER_ROLES.USER,
    allowNull: false
  },
  email_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true
  },
  failed_login_attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  locked_until: {
    type: DataTypes.DATE,
    allowNull: true
  },
  profile_image: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_520_ci',
  indexes: [
    {
      name: 'user_login_key',
      unique: true,
      fields: ['user_login']
    },
    {
      name: 'user_email_key', 
      unique: true,
      fields: ['user_email']
    },
    {
      name: 'user_nicename',
      fields: ['user_nicename']
    },
    {
      name: 'user_role_index',
      fields: ['user_role']
    },
    {
      name: 'user_status_index',
      fields: ['user_status']
    }
  ],
  hooks: {
    beforeCreate: async (user) => {
      // Hash password
      if (user.user_pass) {
        user.user_pass = await bcrypt.hash(user.user_pass, 12);
      }
      
      // Generate nicename from login
      if (!user.user_nicename) {
        user.user_nicename = user.user_login.toLowerCase().replace(/[^a-z0-9]/g, '');
      }
      
      // Set display name
      if (!user.display_name) {
        user.display_name = user.user_login;
      }
    },
    
    beforeUpdate: async (user) => {
      // Hash password if changed
      if (user.changed('user_pass')) {
        user.user_pass = await bcrypt.hash(user.user_pass, 12);
      }
    }
  }
});

// Instance methods
User.prototype.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.user_pass);
};

User.prototype.generateToken = function() {
  return jwt.sign(
    { 
      id: this.ID, 
      email: this.user_email,
      role: this.user_role,
      login: this.user_login
    },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

User.prototype.hasPermission = function(permission) {
  return hasPermission(this.user_role, permission);
};

User.prototype.canEditPost = function(post) {
  // Superadmin and admin can edit any post
  if (this.user_role === USER_ROLES.SUPERADMIN || this.user_role === USER_ROLES.ADMIN) {
    return true;
  }
  
  // Writer can only edit their own posts
  if (this.user_role === USER_ROLES.WRITER) {
    return post.post_author === this.ID;
  }
  
  return false;
};

User.prototype.canDeletePost = function(post) {
  // Only superadmin and admin can delete posts
  return this.user_role === USER_ROLES.SUPERADMIN || this.user_role === USER_ROLES.ADMIN;
};

User.prototype.canApprovePost = function() {
  // Only admin and superadmin can approve posts
  return this.user_role === USER_ROLES.ADMIN || this.user_role === USER_ROLES.SUPERADMIN;
};

User.prototype.isLocked = function() {
  return this.locked_until && new Date() < this.locked_until;
};

User.prototype.isActive = function() {
  return this.user_status === 1 && !this.isLocked();
};

User.prototype.toSafeJSON = function() {
  const userObj = this.toJSON();
  delete userObj.user_pass;
  delete userObj.user_activation_key;
  delete userObj.failed_login_attempts;
  delete userObj.locked_until;
  return userObj;
};

// Static methods
User.findByEmailOrLogin = async function(identifier) {
  return await User.findOne({
    where: {
      [sequelize.Sequelize.Op.or]: [
        { user_email: identifier },
        { user_login: identifier }
      ]
    }
  });
};

User.incrementFailedAttempts = async function(userId) {
  const user = await User.findByPk(userId);
  if (user) {
    const attempts = user.failed_login_attempts + 1;
    const updates = { failed_login_attempts: attempts };
    
    // Lock account after 5 failed attempts for 15 minutes
    if (attempts >= 5) {
      updates.locked_until = new Date(Date.now() + 15 * 60 * 1000);
    }
    
    await user.update(updates);
  }
};

User.resetFailedAttempts = async function(userId) {
  await User.update(
    { failed_login_attempts: 0, locked_until: null },
    { where: { ID: userId } }
  );
};

module.exports = User;