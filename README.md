# Proyecto Unidad 4 - CRUD MongoDB, JWT, OAuth y Deploy

## Descripción

Este proyecto corresponde a la Unidad 4: Pruebas, seguridad y despliegue.

Se desarrolló una aplicación con backend en Node.js y Express, base de datos MongoDB Atlas, autenticación con JWT, login con Google OAuth y frontend en React.

## Tecnologías utilizadas

### Backend

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Passport
- passport-google-oauth20
- CORS
- dotenv

### Frontend

- React
- Vite
- React Router DOM
- JavaScript
- CSS

## Enlaces del proyecto

### Repositorio GitHub

```text
https://github.com/TU_USUARIO/TU_REPOSITORIO
```

### Backend desplegado en Render

```text
https://backend-unidad4.onrender.com
```

### Frontend desplegado en Vercel

```text
https://s14-trabajo-pr-ctico-experimental-4-nine.vercel.app/
```

---

# Instalación y ejecución del proyecto

## 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd TU_REPOSITORIO
```

---

# Backend

## 2. Instalar dependencias del backend

Si el backend está en la raíz del proyecto:

```bash
npm install
```

Si está dentro de una carpeta llamada `backend`:

```bash
cd backend
npm install
```

---

## 3. Crear archivo `.env` del backend

En la raíz del backend crear un archivo llamado:

```bash
.env
```

Agregar las siguientes variables:

```env
PORT=3000
MONGO_URI=TU_CONEXION_MONGODB_ATLAS
JWT_SECRET=clave_secreta_unidad4_2026
FRONTEND_URL=https://s14-trabajo-pr-ctico-experimental-4-nine.vercel.app
GOOGLE_CLIENT_ID=TU_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=TU_GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL=https://backend-unidad4.onrender.com/auth/google/callback
```

---

## 4. Ejecutar el backend en modo desarrollo

```bash
npm run dev
```

El servidor se ejecutará en:

```text
http://localhost:3000
```

---

## 5. Ejecutar el backend en producción

```bash
npm start
```

---

# Frontend

## 6. Entrar a la carpeta del frontend

Si tu frontend está dentro de:

```text
frontend/unidad4-frontend
```

Ejecuta:

```bash
cd frontend/unidad4-frontend
```

---

## 7. Instalar dependencias del frontend

```bash
npm install
```

---

## 8. Crear archivo `.env` del frontend

Dentro de la carpeta del frontend crear un archivo llamado:

```bash
.env
```

Agregar:

```env
VITE_API_URL=https://backend-unidad4.onrender.com
```

---

## 9. Ejecutar el frontend

```bash
npm run dev
```

El frontend se ejecutará normalmente en:

```text
http://localhost:5173
```

---

# Endpoints principales del backend

## Autenticación

### Registrar usuario

```http
POST /api/auth/register
```

Ejemplo de body:

```json
{
  "nombre": "Arianna",
  "apellido": "Alvarado",
  "correo": "arianna@gmail.com",
  "password": "123456",
  "telefono": "0999999999",
  "direccion": "Milagro"
}
```

---

### Iniciar sesión

```http
POST /api/auth/login
```

Ejemplo de body:

```json
{
  "correo": "arianna@gmail.com",
  "password": "123456"
}
```

---

### Perfil protegido

```http
GET /api/auth/perfil
```

Requiere token:

```http
Authorization: Bearer TOKEN
```

---

# CRUD de usuarios

## Crear usuario

```http
POST /api/usuarios
```

## Listar usuarios

```http
GET /api/usuarios
```

## Obtener usuario por ID

```http
GET /api/usuarios/:id
```

## Actualizar usuario

```http
PUT /api/usuarios/:id
```

## Eliminar usuario

```http
DELETE /api/usuarios/:id
```

Las rutas protegidas requieren enviar el token JWT en el header:

```http
Authorization: Bearer TOKEN
```

---

# Google OAuth

## Iniciar sesión con Google

```http
GET /auth/google
```

## Callback de Google

```http
GET /auth/google/callback
```

---

# Despliegue

## Backend

El backend fue desplegado en Render.

URL:

```text
https://backend-unidad4.onrender.com
```

## Frontend

El frontend fue desplegado en Vercel.

URL:

```text
https://s14-trabajo-pr-ctico-experimental-4-nine.vercel.app/
```

---

# Pruebas realizadas

Las pruebas fueron realizadas usando Postman y el frontend desarrollado en React.

Se probaron:

- Registro de usuarios.
- Inicio de sesión con JWT.
- Protección de rutas mediante token.
- CRUD de usuarios.
- Login con Google OAuth.
- Conexión con MongoDB Atlas.
- Despliegue en Render y Vercel.

---
