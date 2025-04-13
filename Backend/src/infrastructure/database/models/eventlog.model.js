function model(sequelize, DataTypes) {
  const attributes = {
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
  };

  const _model = sequelize.define('eventLog', attributes, {
    tableName: 'EventLogs',
    timestamps: false, // desactiva updatedAt
  });

  _model.associate = function (models) {
    // Asocia aquí si más adelante lo necesitas
    // _model.belongsTo(models.User); por ejemplo
  };

  return _model;
}

module.exports = model;
