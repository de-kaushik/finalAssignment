
const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Hackathon = sequelize.define('Hackathon', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  technologyStack: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  minimumRequirement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  registrationStartDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  registrationEndDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Hackathon;
