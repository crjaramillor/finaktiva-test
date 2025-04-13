const express = require('express');
const cors = require('cors');  // Importa cors
const app = express();
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./docs/swagger');

// Habilitar CORS para todas las rutas y todos los orígenes
app.use(cors({ origin: 'http://localhost:4200' })); 

// Swagger docs en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Usar express.json() para procesar el cuerpo de la solicitud
app.use(express.json());

const logger = require('./interfaces/middlewares/logger');

app.use(logger);

// Rutas
const eventRoutes = require('./interfaces/routes/eventRoutes');
app.use('/api', eventRoutes);

// Middleware de errores (después de las rutas)
const errorHandler = require('./interfaces/middlewares/errorHandler');
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
