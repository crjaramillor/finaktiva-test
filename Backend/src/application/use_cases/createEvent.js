const models = require('../../infrastructure/database/models');
const eventValidator = require('../validators/eventValidator');

async function createEvent(data) {
  const { error } = eventValidator.createEvent.validate(data);

  if (error) {
    const validationError = new Error(error.details[0].message);
    validationError.status = 400;
    throw validationError;
  }

  const { description, type } = data;

  const newEvent = await models.eventLog.create({ description, type });

  return newEvent;
}

module.exports = createEvent;
