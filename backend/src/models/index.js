// Backend/src/models/index.js (CORREGIDO COMPLETO)
const sequelize = require('../config/database');

// ===== IMPORTAR TODOS LOS MODELOS =====
const User = require('./User');
const Residence = require('./Residence');
const ReassignmentHistory = require('./ReassignmentHistory');
const Activity = require('./Activity');
const Amenity = require('./Amenity');
const AmenityReservation = require('./AmenityReservation');
const Report = require('./Report');
const Complaint = require('./Complaint');
const Payment = require('./Payment');
const ServiceCost = require('./ServiceCost');

// Verificar que todos los modelos se cargaron correctamente
if (!User || typeof User !== 'function') {
  throw new Error('Error: User no se cargó correctamente');
}
if (!Amenity || typeof Amenity !== 'function') {
  throw new Error('Error: Amenity no se cargó correctamente');
}
if (!AmenityReservation || typeof AmenityReservation !== 'function') {
  throw new Error('Error: AmenityReservation no se cargó correctamente');
}

// ===== DEFINIR ASOCIACIONES =====
// ===== RELACIONES DE RESIDENCE =====

// Residence - Dueño
Residence.belongsTo(User, {
  foreignKey: 'dueno_id',
  as: 'dueno'
});
User.hasMany(Residence, {
  foreignKey: 'dueno_id',
  as: 'residenciasComodueno'
});

// Residence - Residente Actual
Residence.belongsTo(User, {
  foreignKey: 'residente_actual_id',
  as: 'residenteActual'
});
User.hasMany(Residence, {
  foreignKey: 'residente_actual_id',
  as: 'residenciasComoResidente'
});

// Residence - Administrador
Residence.belongsTo(User, {
  foreignKey: 'administrador_id',
  as: 'administrador'
});
User.hasMany(Residence, {
  foreignKey: 'administrador_id',
  as: 'residenciasComoAdministrador'
});

// ===== RELACIONES DE REASSIGNMENT HISTORY =====

ReassignmentHistory.belongsTo(Residence, {
  foreignKey: 'residencia_id',
  as: 'residencia'
});
Residence.hasMany(ReassignmentHistory, {
  foreignKey: 'residencia_id',
  as: 'historialReasignaciones'
});

ReassignmentHistory.belongsTo(User, {
  foreignKey: 'residente_anterior_id',
  as: 'residenteAnterior'
});

ReassignmentHistory.belongsTo(User, {
  foreignKey: 'residente_nuevo_id',
  as: 'residenteNuevo'
});

ReassignmentHistory.belongsTo(User, {
  foreignKey: 'autorizado_por',
  as: 'autorizadoPor'
});

// ===== RELACIONES DE ACTIVITY =====

User.hasMany(Activity, {
  foreignKey: 'organizador_id',
  as: 'actividadesOrganizadas'
});
Activity.belongsTo(User, {
  foreignKey: 'organizador_id',
  as: 'organizador'
});

// ===== RELACIONES DE AMENITY =====

Amenity.hasMany(AmenityReservation, {
  foreignKey: 'amenidad_id',
  as: 'reservas'
});
AmenityReservation.belongsTo(Amenity, {
  foreignKey: 'amenidad_id',
  as: 'amenidad'
});

User.hasMany(AmenityReservation, {
  foreignKey: 'usuario_id',
  as: 'reservasAmenidades'
});
AmenityReservation.belongsTo(User, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});

// ===== RELACIONES DE REPORT =====

User.hasMany(Report, {
  foreignKey: 'reportado_por_id',
  as: 'reportesCreados'
});
Report.belongsTo(User, {
  foreignKey: 'reportado_por_id',
  as: 'reportadoPor'
});

User.hasMany(Report, {
  foreignKey: 'asignado_a',
  as: 'reportesAsignados'
});
Report.belongsTo(User, {
  foreignKey: 'asignado_a',
  as: 'asignadoA'
});

Residence.hasMany(Report, {
  foreignKey: 'residencia_id',
  as: 'reportes'
});
Report.belongsTo(Residence, {
  foreignKey: 'residencia_id',
  as: 'residencia'
});

// ===== RELACIONES DE COMPLAINT =====

User.hasMany(Complaint, {
  foreignKey: 'usuario_id',
  as: 'quejas'
});
Complaint.belongsTo(User, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});

Residence.hasMany(Complaint, {
  foreignKey: 'residencia_id',
  as: 'quejas'
});
Complaint.belongsTo(Residence, {
  foreignKey: 'residencia_id',
  as: 'residencia'
});

// ===== RELACIONES DE PAYMENT =====

User.hasMany(Payment, {
  foreignKey: 'residente_id',
  as: 'pagos'
});
Payment.belongsTo(User, {
  foreignKey: 'residente_id',
  as: 'residente'
});

ServiceCost.hasMany(Payment, {
  foreignKey: 'servicio_costo_id',
  as: 'pagos'
});
Payment.belongsTo(ServiceCost, {
  foreignKey: 'servicio_costo_id',
  as: 'servicioCosto'
});

// ===== RELACIONES DE SERVICE COST =====

Residence.hasMany(ServiceCost, {
  foreignKey: 'residencia_id',
  as: 'costos'
});
ServiceCost.belongsTo(Residence, {
  foreignKey: 'residencia_id',
  as: 'residencia'
});

// Exportar modelos
module.exports = {
  sequelize,
  User,
  Residence,
  ReassignmentHistory,
  Activity,
  Amenity,
  AmenityReservation,
  Report,
  Complaint,
  Payment,
  ServiceCost
};