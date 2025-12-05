# Sistema de Administración de Residencias

Sistema completo de gestión de residencias con funcionalidades para administradores y residentes.

## 🚀 Características Principales

### Para Administradores
- ✅ **Gestión de Residencias**
  - Crear, editar y eliminar residencias
  - Configurar tipo de propiedad (Renta/Compra)
  - Establecer precios
  - Asignar residentes y dueños
  - Consultar historial de asignaciones

- ✅ **Gestión de Actividades**
  - Crear y programar eventos
  - Gestionar tipos de actividades (Reuniones, Eventos, Asambleas, etc.)
  - Control de participantes

- ✅ **Gestión de Amenidades**
  - Crear y administrar amenidades
  - Sistema de reservas
  - Control de disponibilidad
  - Mantenimiento y estados

- ✅ **Gestión de Pagos**
  - Consultar pagos de residencias
  - Registrar pagos manuales
  - Resumen de pagos por mes
  - Reportes de pagos por residente

- ✅ **Atención de Reportes**
  - Ver todos los reportes de residentes
  - Asignar reportes a administradores
  - Actualizar estados
  - Resolver incidentes

- ✅ **Atención de Quejas**
  - Revisar quejas de residentes
  - Responder a quejas
  - Cambiar estados y prioridades
  - Quejas anónimas

### Para Residentes
- ✅ **Mi Residencia**
  - Visualizar información de su residencia
  - Ver detalles de la propiedad

- ✅ **Pagos**
  - Realizar pagos (si es residencia rentada)
  - Consultar historial de pagos
  - Ver montos pendientes

- ✅ **Reportes**
  - Crear reportes de incidentes
  - Dar seguimiento a reportes
  - Ver estado de resolución

- ✅ **Quejas**
  - Registrar quejas
  - Opción de quejas anónimas
  - Seguimiento de quejas

- ✅ **Actividades y Amenidades**
  - Consultar actividades programadas
  - Ver amenidades disponibles
  - Solicitar reservas de amenidades

### Funcionalidades Comunes
- ✅ **Autenticación**
  - Registro de usuarios
  - Login seguro con JWT
  - Roles (Residente, Administrador, SuperAdmin)

- ✅ **Perfil de Usuario**
  - Editar información personal
  - Cambiar contraseña
  - Actualizar datos de contacto

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** con Express
- **PostgreSQL** como base de datos
- **Sequelize** ORM
- **JWT** para autenticación
- **bcryptjs** para encriptación de contraseñas
- **CORS** para manejo de peticiones cross-origin

### Frontend
- **Angular** (última versión)
- **TypeScript**
- **RxJS** para programación reactiva
- **Angular Forms** para manejo de formularios
- **Guards** e **Interceptors** para seguridad

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn
- Angular CLI

## 🔧 Instalación

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd almacen-3
```

### 2. Configurar Backend

```bash
# Ir al directorio del backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Editar .env con tus credenciales de PostgreSQL
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=residence_management
# DB_USER=tu_usuario
# DB_PASSWORD=tu_contraseña
# JWT_SECRET=tu_secreto_jwt
```

### 3. Configurar Base de Datos

```bash
# Crear la base de datos en PostgreSQL
createdb residence_management

# La sincronización de tablas se hace automáticamente al iniciar el servidor
```

### 4. Iniciar Backend

```bash
# En el directorio backend
npm run dev    # Modo desarrollo
# o
npm start      # Modo producción
```

El servidor backend estará disponible en `http://localhost:3000`

### 5. Configurar Frontend

```bash
# Volver al directorio raíz
cd ..

# Instalar Angular CLI globalmente (si no lo tienes)
npm install -g @angular/cli

# Instalar dependencias del frontend
npm install

# Verificar configuración de environment
# El archivo environments/environment.ts debe tener:
# apiUrl: 'http://localhost:3000/api'
```

### 6. Iniciar Frontend

```bash
# En el directorio raíz del proyecto
ng serve

# O si prefieres especificar el puerto
ng serve --port 4200
```

La aplicación frontend estará disponible en `http://localhost:4200`

## 📁 Estructura del Proyecto

```
almacen-3/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuración de BD y constantes
│   │   ├── controllers/     # Controladores de rutas
│   │   ├── middlewares/     # Middleware de autenticación
│   │   ├── models/          # Modelos de Sequelize
│   │   ├── routes/          # Definición de rutas
│   │   └── index.js         # Punto de entrada del servidor
│   ├── .env                 # Variables de entorno
│   └── package.json
│
├── core/
│   ├── guards/              # Guards de autenticación
│   ├── interceptors/        # Interceptors HTTP
│   └── services/            # Servicios de Angular
│       ├── auth.service.ts
│       ├── residence.service.ts
│       ├── amenity.service.ts
│       ├── activity.service.ts
│       ├── report.service.ts
│       ├── complaint.service.ts
│       └── payment.service.ts
│
├── auth/                    # Módulo de autenticación
│   ├── login/
│   └── register/
│
├── users/                   # Módulo de usuarios
│   ├── profile/            # Componente de perfil
│   ├── user-list/
│   └── user-form/
│
├── residences/              # Módulo de residencias
├── activities/              # Módulo de actividades
├── amenities/               # Módulo de amenidades
├── reports/                 # Módulo de reportes
├── complaints/              # Módulo de quejas
├── payments/                # Módulo de pagos
└── environments/            # Configuración de entornos
```

## 🔐 Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/profile` - Obtener perfil (requiere token)
- `PUT /api/auth/profile` - Actualizar perfil (requiere token)

### Residencias
- `GET /api/residences` - Listar residencias
- `GET /api/residences/:id` - Obtener residencia por ID
- `POST /api/residences` - Crear residencia (admin)
- `PUT /api/residences/:id` - Actualizar residencia (admin)
- `POST /api/residences/:id/assign` - Asignar residente (admin)
- `GET /api/residences/:id/history` - Historial de asignaciones
- `DELETE /api/residences/:id` - Eliminar residencia (admin)

### Amenidades
- `GET /api/amenities` - Listar amenidades
- `GET /api/amenities/:id` - Obtener amenidad por ID
- `POST /api/amenities` - Crear amenidad (admin)
- `PUT /api/amenities/:id` - Actualizar amenidad (admin)
- `POST /api/amenities/:id/reserve` - Reservar amenidad (admin)
- `POST /api/amenities/:id/release` - Liberar amenidad (admin)
- `GET /api/amenities/:id/availability` - Verificar disponibilidad
- `DELETE /api/amenities/:id` - Eliminar amenidad (admin)

### Actividades
- `GET /api/activities` - Listar actividades
- `GET /api/activities/:id` - Obtener actividad por ID
- `POST /api/activities` - Crear actividad (admin)
- `PUT /api/activities/:id` - Actualizar actividad (admin)
- `DELETE /api/activities/:id` - Eliminar actividad (admin)

### Reportes
- `GET /api/reports` - Listar reportes
- `GET /api/reports/:id` - Obtener reporte por ID
- `POST /api/reports` - Crear reporte
- `PUT /api/reports/:id` - Actualizar reporte
- `POST /api/reports/:id/assign` - Asignar reporte (admin)
- `GET /api/reports/user/:userId` - Reportes por usuario
- `GET /api/reports/statistics` - Estadísticas de reportes
- `DELETE /api/reports/:id` - Eliminar reporte (admin)

### Quejas
- `GET /api/complaints` - Listar quejas
- `GET /api/complaints/:id` - Obtener queja por ID
- `POST /api/complaints` - Crear queja
- `PUT /api/complaints/:id` - Actualizar queja
- `POST /api/complaints/:id/respond` - Responder queja (admin)
- `GET /api/complaints/user/:userId` - Quejas por usuario
- `DELETE /api/complaints/:id` - Eliminar queja (admin)

### Pagos
- `GET /api/payments` - Listar pagos
- `GET /api/payments/:id` - Obtener pago por ID
- `POST /api/payments` - Registrar pago
- `GET /api/payments/resident/:residentId` - Pagos por residente
- `GET /api/payments/summary` - Resumen de pagos
- `DELETE /api/payments/:id` - Eliminar pago (admin)

## 👥 Roles y Permisos

### SuperAdmin
- Acceso completo a todas las funcionalidades
- Gestión de usuarios
- Configuración del sistema

### Administrador
- Gestión de residencias, amenidades y actividades
- Atención de reportes y quejas
- Consulta de pagos
- No puede gestionar otros administradores

### Residente
- Ver su residencia
- Realizar y consultar pagos
- Crear reportes y quejas
- Consultar actividades y amenidades
- Solicitar reservas de amenidades

## 🔒 Seguridad

- Autenticación mediante JWT
- Encriptación de contraseñas con bcrypt
- Validación de datos en backend y frontend
- Guards para protección de rutas
- Interceptors para manejo de tokens
- Control de acceso basado en roles

## 📝 Notas de Desarrollo

### Variables de Entorno Importantes

```env
PORT=3000                    # Puerto del servidor backend
NODE_ENV=development         # Ambiente (development/production)
DB_HOST=localhost           # Host de PostgreSQL
DB_PORT=5432                # Puerto de PostgreSQL
DB_NAME=residence_management # Nombre de la base de datos
DB_USER=postgres            # Usuario de PostgreSQL
DB_PASSWORD=postgres        # Contraseña de PostgreSQL
JWT_SECRET=tu_secreto       # Secret para JWT (¡cambiar en producción!)
CORS_ORIGIN=http://localhost:4200 # Origen permitido para CORS
```

### Primer Usuario Administrador

Para crear el primer usuario administrador, puedes:

1. Registrarte normalmente a través de la API
2. Modificar el rol directamente en la base de datos:

```sql
UPDATE users SET rol = 'SuperAdmin' WHERE email = 'tu@email.com';
```

O usar el endpoint de registro especificando el rol (durante desarrollo):

```bash
POST /api/auth/register
{
  "nombre": "Admin",
  "apellido": "Principal",
  "email": "admin@example.com",
  "password": "password123",
  "rol": "SuperAdmin"
}
```

## 🐛 Solución de Problemas

### Error de conexión a la base de datos
- Verificar que PostgreSQL esté corriendo
- Comprobar credenciales en `.env`
- Asegurarse de que la base de datos exista

### Error de CORS
- Verificar que `CORS_ORIGIN` en `.env` coincida con la URL del frontend
- Comprobar configuración de CORS en `backend/src/index.js`

### Token expirado
- Los tokens JWT expiran en 24 horas
- Hacer logout y login nuevamente

## 📄 Licencia

Este proyecto está bajo licencia MIT.

## 👨‍💻 Desarrollado por

[Tu Nombre/Empresa]

## 📞 Soporte

Para soporte o preguntas, contactar a: [tu@email.com]
