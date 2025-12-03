// Backend/src/models/Report.js (CORREGIDO COMPLETO)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [5, 150]
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [10, 5000]
    }
  },
  tipo: {
    type: DataTypes.ENUM(
      'Incendio',
      'Eléctrico',
      'Agua',
      'Robo',
      'Otro'
    ),
    allowNull: false,
    defaultValue: 'Otro'
  },
  prioridad: {
    type: DataTypes.ENUM(
      'Baja',
      'Media',
      'Alta',
      'Crítica'
    ),
    allowNull: false,
    defaultValue: 'Media'
  },
  estado: {
    type: DataTypes.ENUM(
      'Abierto',
      'En Progreso',
      'Resuelto',
      'Cerrado'
    ),
    allowNull: false,
    defaultValue: 'Abierto'
  },
  reportado_por_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  asignado_a: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  residencia_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'residences',
      key: 'id'
    }
  },
  fecha_resolucion: {
    type: DataTypes.DATE,
    allowNull: true
  },
  notas_adicionales: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'reports',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Report;