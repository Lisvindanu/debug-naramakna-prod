const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TermTaxonomy = sequelize.define('TermTaxonomy', {
  term_taxonomy_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  term_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
    references: {
      model: 'terms',
      key: 'term_id'
    }
  },
  taxonomy: {
    type: DataTypes.STRING(32),
    allowNull: false,
    defaultValue: ''
  },
  description: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  parent: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0
  },
  count: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'term_taxonomy',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_520_ci',
  indexes: [
    {
      name: 'term_id_taxonomy',
      unique: true,
      fields: ['term_id', 'taxonomy']
    },
    {
      name: 'taxonomy',
      fields: ['taxonomy']
    }
  ]
});

module.exports = TermTaxonomy;