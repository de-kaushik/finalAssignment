
const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Participation = sequelize.define('Participation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = Participation;
