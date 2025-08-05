const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TermRelationship = sequelize.define('TermRelationship', {
  object_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
    primaryKey: true,
    references: {
      model: 'posts',
      key: 'ID'
    }
  },
  term_taxonomy_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
    primaryKey: true,
    references: {
      model: 'term_taxonomy',
      key: 'term_taxonomy_id'
    }
  },
  term_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'term_relationships',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_520_ci',
  indexes: [
    {
      name: 'term_taxonomy_id',
      fields: ['term_taxonomy_id']
    }
  ]
});

module.exports = TermRelationship;