const express = require('express');
const router = express.Router();
const sequelize = require('../../config/database');
const models = require('../database/models');

// async function syncDatabase() {
//   try {
//     await sequelize.authenticate();
//     console.log('Conexión establecida correctamente.');

//     await sequelize.sync({ alter: true }); // o { force: true } si quieres borrar y crear
//     console.log('Tablas sincronizadas correctamente.');
//   } catch (error) {
//     console.error('Error al conectar o sincronizar la base de datos:', error);
//   }
// }

// syncDatabase();

router.head('/sync', async function (req, res, next) {
  try {
    await models.sequelize.sync({ alter: true });
    res.json();
  } catch (err) {
    console.error('Error al sincronizar', err);
    next({ err });
  }
});

module.exports=router;