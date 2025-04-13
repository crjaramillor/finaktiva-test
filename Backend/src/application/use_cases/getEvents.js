const { Op } = require('sequelize');
const models = require('../../infrastructure/database/models');

async function getEvents({ type, startDate, endDate }) {
  const where = {};

  // Filtro por tipo de evento
  if (type) {
    where.type = type;
  }

  // Filtro por fecha de inicio (startDate)
  if (startDate) {
    where.createdAt = {
      ...where.createdAt,
      [Op.gte]: new Date(startDate), // Buscar eventos después de la fecha de inicio
    };
  }

  // Filtro por fecha de fin (endDate)
  if (endDate) {
    where.createdAt = {
      ...where.createdAt,
      [Op.lte]: new Date(endDate), // Buscar eventos antes de la fecha de fin
    };
  }

  return await models.eventLog.findAll({ where });
}

module.exports = getEvents;
