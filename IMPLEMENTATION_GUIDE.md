# Guía de Implementación - Sistema de Administración de Residencias

## ✅ Implementado

### Backend (100% Completo)

#### 1. **Modelos de Base de Datos**
- ✅ User - Con autenticación y roles
- ✅ Residence - **Con tipo_propiedad y precio**
- ✅ Amenity - Con sistema de estados
- ✅ AmenityReservation - Para reservas de amenidades
- ✅ Activity - Eventos y actividades
- ✅ Report - Reportes de incidentes
- ✅ Complaint - Sistema de quejas
- ✅ Payment - Pagos de residencias
- ✅ ServiceCost - Costos de servicios
- ✅ ReassignmentHistory - Historial de reasignaciones

#### 2. **Controladores y Rutas**
- ✅ **authController** - Login, registro, perfil, actualización de perfil
- ✅ **residenceController** - CRUD con tipo_propiedad y precio
- ✅ **amenityController** - CRUD + reservas (reserve, release, check availability)
- ✅ **activityController** - Gestión completa de actividades
- ✅ **reportController** - Gestión de reportes con asignación
- ✅ **complaintController** - Gestión de quejas con respuestas
- ✅ **paymentController** - Gestión de pagos con resúmenes

#### 3. **Autenticación y Seguridad**
- ✅ JWT tokens
- ✅ Middleware de autenticación
- ✅ Control de roles (Residente, Administrador, SuperAdmin)
- ✅ Hash de contraseñas con bcrypt

### Frontend (Angular)

#### 1. **Servicios Creados (100%)**
- ✅ **AuthService** - Con updateProfile
- ✅ **ResidenceService** - CRUD completo con tipo_propiedad y precio
- ✅ **AmenityService** - Con sistema de reservas
- ✅ **ActivityService** - Gestión de actividades
- ✅ **ReportService** - Gestión de reportes
- ✅ **ComplaintService** - Gestión de quejas
- ✅ **PaymentService** - Gestión de pagos

#### 2. **Componentes Actualizados**
- ✅ **residence-form** - Con campos tipo_propiedad y precio
- ✅ **amenity-booking** - Sistema de reservas funcional
- ✅ **report-form** - Conectado con ReportService
- ✅ **profile** - Componente de edición de perfil completo

#### 3. **Guards e Interceptors**
- ✅ auth.guard - Protección de rutas
- ✅ role.guard - Control de acceso por roles
- ✅ auth.interceptor - Agregar token automáticamente
- ✅ error.interceptor - Manejo de errores

## 📋 Componentes Pendientes de Actualizar

Los siguientes componentes existen pero necesitan conectarse con los servicios creados:

### 1. **Quejas (Complaints)**
**Archivos a actualizar:**
- `complaints/complaint-form/complaint-form.component.ts`
- `complaints/complaint-list/complaint-list.component.ts`

**Cambios necesarios:**
```typescript
// Reemplazar UseCases por:
import { ComplaintService } from '../../../core/services/complaint.service';

private complaintService = inject(ComplaintService);

// Usar métodos del servicio:
this.complaintService.getAllComplaints(filters)
this.complaintService.createComplaint(data)
this.complaintService.updateComplaint(id, data)
```

### 2. **Pagos (Payments)**
**Archivos a actualizar:**
- `payments/payment-form/payment-form.component.ts`
- `payments/payment-list/payment-list.component.ts`

**Cambios necesarios:**
```typescript
// Reemplazar UseCases por:
import { PaymentService } from '../../../core/services/payment.service';

private paymentService = inject(PaymentService);

// Usar métodos del servicio:
this.paymentService.getAllPayments(filters)
this.paymentService.createPayment(data)
this.paymentService.getPaymentsByResident(residentId)
```

### 3. **Actividades (Activities)**
**Archivos a actualizar:**
- `activities/activity-form/activity-form.component.ts`
- `activities/activity-list/activity-list.component.ts`

**Cambios necesarios:**
```typescript
// Reemplazar UseCases por:
import { ActivityService } from '../../../core/services/activity.service';

private activityService = inject(ActivityService);

// Usar métodos del servicio:
this.activityService.getAllActivities(filters)
this.activityService.createActivity(data)
this.activityService.updateActivity(id, data)
```

### 4. **Listas y Detalles**
Todos los componentes de listado necesitan actualización similar:
- `residences/residence-list/residence-list.component.ts`
- `amenities/amenity-list/amenity-list.component.ts`
- `amenities/amenity-detail/amenity-detail.component.ts`
- `reports/report-list/report-list.component.ts`
- Etc.

## 🔧 Patrón de Actualización

Para actualizar cualquier componente, sigue este patrón:

### Paso 1: Actualizar Imports
```typescript
// ANTES:
import { GetAllXXXUseCase } from '../../../domain/use-cases/...';
import { CreateXXXUseCase } from '../../../domain/use-cases/...';

// DESPUÉS:
import { XXXService } from '../../../core/services/xxx.service';
```

### Paso 2: Inyectar Servicio
```typescript
// ANTES:
private getAllXXX = inject(GetAllXXXUseCase);
private createXXX = inject(CreateXXXUseCase);

// DESPUÉS:
private xxxService = inject(XXXService);
```

### Paso 3: Usar Métodos del Servicio
```typescript
// ANTES:
this.getAllXXX.execute(params).subscribe(...)

// DESPUÉS:
this.xxxService.getAllXXX(params).subscribe(...)
```

### Paso 4: Manejar Respuestas del Backend
```typescript
// El backend devuelve:
// { message: string, data: T } o { data: T[], total: number, ... }

// Ejemplo:
this.xxxService.getById(id).subscribe({
  next: (response) => {
    const item = response.xxx; // o response.data
    // ...
  },
  error: (error) => {
    this.notificationService.error(error.error?.message || 'Error genérico');
  }
});
```

## 🚀 Rutas a Agregar

Agregar ruta del componente de perfil en `app.routes.ts` o el archivo de rutas correspondiente:

```typescript
{
  path: 'profile',
  component: ProfileComponent,
  canActivate: [authGuard]
}
```

## 📝 Funcionalidades Implementadas por Rol

### Administrador/SuperAdmin
✅ Crear, editar y eliminar residencias
✅ Especificar tipo de propiedad (Renta/Compra) y precio
✅ Crear y gestionar actividades
✅ Crear y gestionar amenidades
✅ Aprobar/rechazar reservas de amenidades
✅ Ver y responder reportes
✅ Ver y atender quejas
✅ Consultar pagos de residencias
✅ Editar perfil

### Residente
✅ Ver su residencia asignada
✅ Realizar pagos (si es residencia rentada)
✅ Ver historial de pagos
✅ Crear reportes de incidentes
✅ Crear quejas (opción anónima)
✅ Ver actividades programadas
✅ Ver amenidades disponibles
✅ Solicitar reservas de amenidades
✅ Editar perfil

## 🎯 Endpoints Disponibles

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `PUT /api/auth/profile` ⭐ NUEVO

### Residences
- `GET /api/residences`
- `GET /api/residences/:id`
- `POST /api/residences` (con tipo_propiedad y precio)
- `PUT /api/residences/:id`
- `DELETE /api/residences/:id`

### Amenities
- `GET /api/amenities`
- `GET /api/amenities/:id`
- `POST /api/amenities`
- `PUT /api/amenities/:id`
- `DELETE /api/amenities/:id`
- `POST /api/amenities/:id/reserve` ⭐ NUEVO
- `POST /api/amenities/:id/release` ⭐ NUEVO
- `GET /api/amenities/:id/availability` ⭐ NUEVO

### Activities
- `GET /api/activities`
- `GET /api/activities/:id`
- `POST /api/activities`
- `PUT /api/activities/:id`
- `DELETE /api/activities/:id`

### Reports
- `GET /api/reports`
- `GET /api/reports/:id`
- `POST /api/reports`
- `PUT /api/reports/:id`
- `POST /api/reports/:id/assign`
- `GET /api/reports/user/:userId`
- `GET /api/reports/statistics`
- `DELETE /api/reports/:id`

### Complaints
- `GET /api/complaints`
- `GET /api/complaints/:id`
- `POST /api/complaints`
- `PUT /api/complaints/:id`
- `POST /api/complaints/:id/respond`
- `GET /api/complaints/user/:userId`
- `DELETE /api/complaints/:id`

### Payments
- `GET /api/payments`
- `GET /api/payments/:id`
- `POST /api/payments`
- `GET /api/payments/resident/:residentId`
- `GET /api/payments/summary`
- `DELETE /api/payments/:id`

## 🔐 Configuración Requerida

### Backend (.env)
```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=residence_management
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=tu_secreto_super_seguro
CORS_ORIGIN=http://localhost:4200
```

### Frontend (environments/environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## 📊 Próximos Pasos Recomendados

1. **Actualizar componentes de listas** para usar los servicios
2. **Actualizar componentes de quejas** con ComplaintService
3. **Actualizar componentes de pagos** con PaymentService
4. **Actualizar componentes de actividades** con ActivityService
5. **Agregar ruta de perfil** en el sistema de rutas
6. **Probar flujo completo** de cada funcionalidad
7. **Agregar tests unitarios** para componentes y servicios

## 💡 Tips de Desarrollo

1. **Usar el patrón establecido**: Todos los servicios siguen la misma estructura
2. **Manejo de errores**: Siempre capturar `error.error?.message`
3. **Loading states**: Implementar `isLoading` en componentes
4. **Validaciones**: Usar ReactiveFormsModule con validadores
5. **Notificaciones**: Usar NotificationService para feedback al usuario
6. **Guards**: Proteger rutas según rol del usuario

## 🐛 Debugging

Si encuentras errores:

1. **Backend**:
   - Verificar que PostgreSQL esté corriendo
   - Revisar logs en consola del servidor
   - Verificar que `.env` esté configurado

2. **Frontend**:
   - Abrir DevTools y revisar Network tab
   - Verificar que el token se esté enviando
   - Revisar errores en Console tab

3. **Conexión**:
   - Verificar que CORS esté configurado
   - Verificar que apiUrl sea correcto
   - Probar endpoints con Postman/Thunder Client

## 📞 Soporte

Para más información o dudas sobre la implementación, referirse a:
- README.md principal
- Documentación de cada servicio
- Comentarios en el código
