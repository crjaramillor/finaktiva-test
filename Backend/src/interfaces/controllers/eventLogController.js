const createEventUseCase = require('../../application/use_cases/createEvent');
const getEventsUseCase = require('../../application/use_cases/getEvents');
const eventValidator = require('../../application/validators/eventValidator');

class EventLogController {
  // Crear evento
  static async createEvent(req, res) {
    try {
      // Verificar si el cuerpo de la solicitud está presente
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'El cuerpo de la solicitud está vacío o no se proporcionaron datos.',
        });
      }

      // Verificar el tipo de contenido (Content-Type)
      if (req.headers['content-type'] !== 'application/json') {
        return res.status(400).json({
          success: false,
          message: 'El tipo de contenido debe ser application/json',
        });
      }

      // Validar los datos para la creación del evento usando el validador
      const { error } = eventValidator.createEvent.validate(req.body);

      if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          errors: errorMessages,
        });
      }

      // Si la validación es correcta, llamamos al caso de uso para crear el evento
      const event = await createEventUseCase(req.body);
      res.status(201).json({
        success: true,
        message: 'Evento creado exitosamente',
        data: event,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el evento' });
    }
  }

  // Consultar eventos con filtros
  static async getEvents(req, res) {
    try {
      // Validar los parámetros de consulta usando el validador
      const { error } = eventValidator.getEvents.validate(req.query);

      if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({
          success: false,
          message: 'Parámetros de consulta inválidos',
          errors: errorMessages,
        });
      }

      // Si la validación es correcta, llamamos al caso de uso para obtener los eventos
      const events = await getEventsUseCase(req.query);
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al consultar eventos' });
    }
  }
}

module.exports = EventLogController;
