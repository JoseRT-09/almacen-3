// Backend/src/seeders/seed.js
const { User, sequelize } = require('../models');
const { ROLES, ESTADOS_USUARIO } = require('../config/constants');

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seed de la base de datos...');

    // Verificar si ya existen usuarios
    const userCount = await User.count();
    if (userCount > 0) {
      console.log(`✅ Ya existen ${userCount} usuarios en la base de datos. Seed omitido.`);
      return;
    }

    // Crear usuarios iniciales
    const users = await User.bulkCreate([
      {
        nombre: 'Admin',
        apellido: 'Principal',
        email: 'admin@residencehub.com',
        password: 'Admin123!', // Se encriptará automáticamente por el hook
        telefono: '555-0001',
        rol: ROLES.SUPER_ADMIN,
        estado: ESTADOS_USUARIO.ACTIVO
      },
      {
        nombre: 'María',
        apellido: 'García',
        email: 'maria.garcia@email.com',
        password: 'User123!',
        telefono: '555-0002',
        rol: ROLES.ADMINISTRADOR,
        estado: ESTADOS_USUARIO.ACTIVO
      },
      {
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@email.com',
        password: 'User123!',
        telefono: '555-0003',
        rol: ROLES.RESIDENTE,
        estado: ESTADOS_USUARIO.ACTIVO
      },
      {
        nombre: 'Ana',
        apellido: 'Martínez',
        email: 'ana.martinez@email.com',
        password: 'User123!',
        telefono: '555-0004',
        rol: ROLES.RESIDENTE,
        estado: ESTADOS_USUARIO.ACTIVO
      },
      {
        nombre: 'Carlos',
        apellido: 'López',
        email: 'carlos.lopez@email.com',
        password: 'User123!',
        telefono: '555-0005',
        rol: ROLES.RESIDENTE,
        estado: ESTADOS_USUARIO.ACTIVO
      }
    ]);

    console.log(`✅ Se crearon ${users.length} usuarios exitosamente:`);
    users.forEach(user => {
      console.log(`   - ${user.nombre} ${user.apellido} (${user.rol}) - ${user.email}`);
    });

    console.log('\n📧 Credenciales de acceso:');
    console.log('   Email: admin@residencehub.com');
    console.log('   Password: Admin123!');
    console.log('\n🌱 Seed completado exitosamente!');
  } catch (error) {
    console.error('❌ Error al ejecutar seed:', error);
    throw error;
  }
}

// Ejecutar seed si se llama directamente
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Proceso de seed finalizado');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Error en el proceso de seed:', error);
      process.exit(1);
    });
}

module.exports = seedDatabase;
