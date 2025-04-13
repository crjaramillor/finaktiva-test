const Joi = require('joi');

const eventValidator = {
  // ✅ Validación para creación de eventos
  createEvent: Joi.object({
    description: Joi.string()
      .min(3)
      .required()
      .messages({
        'string.base': 'La descripción debe ser una cadena de texto.',
        'string.min': 'La descripción debe tener al menos 3 caracteres.',
        'any.required': 'La descripción es obligatoria.',
      }),

    type: Joi.string()
      .valid('api', 'manual')
      .required()
      .messages({
        'string.base': 'El tipo debe ser una cadena de texto.',
        'any.only': 'El tipo debe ser "api" o "manual".',
        'any.required': 'El tipo es obligatorio.',
      }),
  }),

  // ✅ Validación para filtros de consulta
  getEvents: Joi.object({
    type: Joi.string()
      .valid('api', 'manual')
      .optional()
      .messages({
        'string.base': 'El tipo debe ser una cadena de texto.',
        'any.only': 'El tipo debe ser "api" o "manual".',
      }),

    startDate: Joi.date()
      .optional()
      .messages({
        'date.base': 'La fecha de inicio debe ser una fecha válida.',
      }),

    endDate: Joi.date()
      .optional()
      .when('startDate', {
        is: Joi.date().required(),
        then: Joi.date().greater(Joi.ref('startDate')).messages({
          'date.greater': 'La fecha de finalización debe ser posterior a la fecha de inicio.',
        }),
      })
      .messages({
        'date.base': 'La fecha de finalización debe ser una fecha válida.',
      }),
  }),
};

module.exports = eventValidator;
