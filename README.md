# 📋 Prueba Técnica - Finaktiva

> Proyecto full stack realizado como parte del proceso técnico para Finaktiva. Incluye un backend con Node.js y un frontend en Angular 19, organizados bajo buenas prácticas como Clean Architecture y separación clara de responsabilidades.

---

## 🚀 Descripción del Proyecto

Este repositorio contiene una aplicación web compuesta por:

1. **Backend**: Desarrollado con **Node.js**, **Express**, **Sequelize** y **MySQL**.
2. **Frontend**: Desarrollado con **Angular 19**, HTML, SCSS y Bootstrap.

Permite consultar eventos registrados y registrar nuevos eventos de forma manual. La interfaz incluye filtros por tipo de evento y fecha, y la API está documentada con Swagger.

---

## 🛠️ Tecnologías Usadas

### Backend

- Node.js
- Express.js
- Sequelize ORM
- MySQL (o MongoDB, si se reconfigura)
- Swagger (para documentación de API)

### Frontend

- Angular 19 (Standalone Components)
- TypeScript
- SCSS
- Bootstrap

---

## 📦 Requisitos Previos

Instala los siguientes programas:

- Node.js (v18.12.0 o superior)
- npm (v10.4.0)
- Angular CLI (v15+)
- MySQL (o MongoDB, opcional)

---

## ⚙️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/TU-USUARIO/prueba-finaktiva.git
cd prueba-finaktiva
```

### 2. Configuración del Backend

```bash
cd Backend
npm install
```

#### Configurar la base de datos (MySQL)

1. Edita `src/config/config.js` con tus credenciales de MySQL.
2. Ejecuta las migraciones:

```bash
npx sequelize-cli db:migrate
```

#### Ejecutar el servidor:

```bash
npm start
```

- El servidor se inicia por defecto en `http://localhost:3000/`
- Documentación de la API disponible en `http://localhost:3000/api-docs`

---

### 3. Configuración del Frontend

```bash
cd ../frontend
npm install
```

Asegúrate de que la URL del backend esté correctamente configurada en el archivo:

```ts
src/app/services/event.service.ts
```

#### Ejecutar el servidor:

```bash
ng serve
```

- La aplicación estará disponible en `http://localhost:4200/`

---

## 🧪 Funcionalidad

- **Lista de eventos:** Se muestra una tabla con los eventos registrados.
- **Agregar evento:** Un botón abre un formulario modal para registrar eventos con tipo `"manual"`.
- **Filtros:** Puedes filtrar por tipo y fecha de evento.
- **API Swagger:** Documentación disponible en `/api-docs`.

---

## 📁 Estructura del Proyecto

```
finaktiva-test/
├── Backend/
│   ├── src/
│   │   ├── application/
│   │   ├── config/
│   │   ├── docs/
│   │   ├── infrastructure/
│   │   ├── interfaces/
│   │   └── app.js
│   └── package.json
├── frontend/
│   ├── src/app/
│   │   ├── components/
│   │   ├── home/
│   │   ├── models/
│   │   └── services/
│   └── package.json
└── .gitignore
```

---

## 🧾 Notas Finales

- Ejecuta **backend y frontend en paralelo** para que la app funcione correctamente.
- Todos los eventos creados desde el frontend tienen `tipo: "manual"`.
- Incluye colección Postman para pruebas en `docs/finaktiva-api.postman_collection.json`.
- Proyecto estructurado siguiendo principios de **Clean Architecture** y buenas prácticas de desarrollo.

---

