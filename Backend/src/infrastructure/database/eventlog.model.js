const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const EventLog = sequelize.define('EventLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('api', 'manual'),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'EventLogs',
  timestamps: false, // Desactiva updatedAt si no lo necesitas
});

module.exports = EventLog;
