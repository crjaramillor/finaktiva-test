
# 📋 Prueba Técnica - Finaktiva

> Proyecto realizado como parte del proceso técnico para Finaktiva. Incluye un backend con Node.js y un frontend en Angular 19, organizados bajo buenas prácticas como Clean Architecture y separación clara de responsabilidades.

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
git clone https://github.com/crjaramillor/finaktiva-test.git
cd prueba-finaktiva
```

### 2. Configuración del Backend

```bash
cd Backend
npm install
```

#### Ejecutar el servidor:

```bash
node src/server.js
```

- El servidor se inicia por defecto en `http://localhost:3000/`
- Documentación de la API disponible en `http://localhost:3000/api-docs`

---

### ⚙️ Configuración de la Base de Datos (MySQL)

Antes de comenzar, asegúrate de que **MySQL** está instalado y en ejecución en tu máquina local.

1. **Crea un archivo `.env`** en la raíz del proyecto con la siguiente configuración, asegurándote de ajustarlo a tu entorno local:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_DATABASE=registration
DB_PASSWORD=
```

2. **Asegúrate de que el servidor de Node.js esté ejecutándose.** 

   Puedes iniciar el servidor ejecutando:

```bash
node src/server.js
```

   El servidor debe estar corriendo en `http://localhost:3000/`.

---

### 🔄 Sincronización de la Base de Datos

Para sincronizar la base de datos y crear las tablas necesarias, puedes enviar una solicitud **HEAD** al siguiente endpoint:

```bash
HEAD http://localhost:3000/db/sync
```

Este endpoint hará que el servidor sincronice la base de datos según la configuración de tu archivo `.env`.

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

### **Endpoints de la API**

| Método | Endpoint                         | Descripción                                    | Cuerpo de la Solicitud                     | Respuesta Esperada         |
|--------|----------------------------------|------------------------------------------------|--------------------------------------------|----------------------------|
| **POST** | `/api/newEvent`                 | Crea un nuevo evento.                          | `{ "description": "Prueba Postman", "type": "api" }` | `201 Created` o similar.    |
| **GET**  | `/api/eventsList`               | Obtiene todos los eventos sin ningún filtro.    | -                                          | `[ { "description": "Evento1", "type": "manual" }, ... ]` |
| **GET**  | `/api/eventsList?type=<tipo>`    | Obtiene eventos filtrados por tipo (api o manual).| Parámetro `type` (ej. `type=api`)          | `[ { "description": "Evento1", "type": "api" }, ... ]` |
| **GET**  | `/api/eventsList?startDate=<fecha_inicio>&endDate=<fecha_fin>` | Obtiene eventos filtrados por rango de fechas.  | Parámetros `startDate` y `endDate` (ej. `startDate=2025-04-01&endDate=2025-04-30`) | `[ { "description": "Evento1", "type": "manual", "date": "2025-04-10" }, ... ]` |
| **GET**  | `/api/eventsList?type=<tipo>&startDate=<fecha_inicio>&endDate=<fecha_fin>` | Obtiene eventos filtrados por tipo y fecha.     | Parámetros `type`, `startDate`, `endDate` (ej. `type=api&startDate=2025-04-01&endDate=2025-04-30`) | `[ { "description": "Evento1", "type": "api", "date": "2025-04-15" }, ... ]` |

### **Detalles de los Endpoints:**

1. **`POST /api/newEvent`**:
   - **Descripción**: Este endpoint se utiliza para crear un nuevo evento en la base de datos. El tipo de evento puede ser "api" o "manual", aunque desde el frontend siempre se enviará como "manual".
   - **Cuerpo de la solicitud**:
     ```json
     {
       "description": "Prueba Postman",
       "type": "api"
     }
     ```
   - **Respuesta esperada**: El servidor responderá con un código HTTP 201 (Creado) si el evento fue registrado correctamente.

2. **`GET /api/eventsList`**:
   - **Descripción**: Obtiene todos los eventos sin aplicar ningún filtro.
   - **Respuesta esperada**: Un array de objetos JSON que representan los eventos:
     ```json
     [
       {
         "description": "Evento1",
         "type": "manual"
       },
       {
         "description": "Evento2",
         "type": "api"
       }
     ]
     ```

3. **`GET /api/eventsList?type=<tipo>`**:
   - **Descripción**: Obtiene los eventos filtrados por tipo, donde `<tipo>` puede ser "api" o "manual".
   - **Ejemplo de URL**: `/api/eventsList?type=api`
   - **Respuesta esperada**: Un array de objetos JSON de los eventos que coincidan con el tipo especificado.

4. **`GET /api/eventsList?startDate=<fecha_inicio>&endDate=<fecha_fin>`**:
   - **Descripción**: Obtiene los eventos que se encuentren dentro de un rango de fechas especificado.
   - **Ejemplo de URL**: `/api/eventsList?startDate=2025-04-01&endDate=2025-04-30`
   - **Respuesta esperada**: Un array de eventos dentro del rango de fechas, con fechas y tipo de evento.

5. **`GET /api/eventsList?type=<tipo>&startDate=<fecha_inicio>&endDate=<fecha_fin>`**:
   - **Descripción**: Obtiene los eventos filtrados tanto por tipo como por un rango de fechas.
   - **Ejemplo de URL**: `/api/eventsList?type=api&startDate=2025-04-01&endDate=2025-04-30`
   - **Respuesta esperada**: Un array de eventos filtrados tanto por tipo como por fechas.

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
## 🧾 Video Explicativo
https://drive.google.com/file/d/1a_NtRHviSK5JTRzkDaPtIMnqALrna0-1/view?usp=sharing 

## 🧾 Notas Finales

- Ejecuta **backend y frontend en paralelo** para que la app funcione correctamente.
- Todos los eventos creados desde el frontend tienen `tipo: "manual"`.
- Incluye colección Postman para pruebas en `docs/finaktiva-api.postman_collection.json`.
- Proyecto estructurado siguiendo principios de **Clean Architecture** y buenas prácticas de desarrollo.

---