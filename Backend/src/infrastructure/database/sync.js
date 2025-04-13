const sequelize = require('../../config/database');
const EventLog = require('./eventlog.model');

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');

    await sequelize.sync({ alter: true }); // o { force: true } si quieres borrar y crear
    console.log('Tablas sincronizadas correctamente.');
  } catch (error) {
    console.error('Error al conectar o sincronizar la base de datos:', error);
  }
}

syncDatabase();
