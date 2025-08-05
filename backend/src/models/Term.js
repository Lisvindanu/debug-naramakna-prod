const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Term = sequelize.define('Term', {
  term_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    defaultValue: ''
  },
  slug: {
    type: DataTypes.STRING(200),
    allowNull: false,
    defaultValue: ''
  },
  term_group: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'terms',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_520_ci',
  indexes: [
    {
      name: 'slug',
      unique: true,
      fields: ['slug']
    },
    {
      name: 'name',
      fields: ['name']
    }
  ]
});

module.exports = Term;