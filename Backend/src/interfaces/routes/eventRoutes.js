const express = require('express');
const EventLogController = require('../controllers/eventLogController');
const router = express.Router();

// Ruta para registrar un evento
router.post('/newEvent', EventLogController.createEvent);

// Ruta para consultar eventos con filtros
router.get('/eventsList', EventLogController.getEvents);

module.exports = router;



/**
 * @swagger
 * /api/newEvent:
 *   post:
 *     summary: Registrar un nuevo evento
 *     description: Crea un nuevo evento en el sistema proporcionando una descripción y un tipo de evento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - type
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Evento de prueba"
 *               type:
 *                 type: string
 *                 enum: [api, manual]
 *                 example: "api"
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 description:
 *                   type: string
 *                   example: "Evento de prueba"
 *                 type:
 *                   type: string
 *                   enum: [api, manual]
 *                   example: "api"
 *       400:
 *         description: Datos inválidos o de entrada incorrectos
 * 
 * /api/eventsList:
 *   get:
 *     summary: Consultar eventos con filtros
 *     description: Obtiene una lista de eventos registrados con filtros opcionales por tipo y fechas.
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [api, manual]
 *         description: Filtrar eventos por tipo
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrar eventos a partir de una fecha de inicio
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrar eventos hasta una fecha final
 *     responses:
 *       200:
 *         description: Lista de eventos filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   description:
 *                     type: string
 *                     example: "Evento de prueba"
 *                   type:
 *                     type: string
 *                     enum: [api, manual]
 *                     example: "api"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-04-12T14:30:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-04-12T14:30:00Z"
 *       400:
 *         description: Parámetros de consulta inválidos
 */
