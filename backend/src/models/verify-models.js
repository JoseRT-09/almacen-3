// Script de diagnóstico para verificar modelos
const sequelize = require('../config/database');

console.log('Verificando importación de modelos...\n');

try {
  console.log('1. Importando User...');
  const User = require('./User');
  console.log('   ✓ User importado:', User.name);
  console.log('   ✓ Es modelo de Sequelize:', User.prototype instanceof sequelize.Sequelize.Model);

  console.log('\n2. Importando Residence...');
  const Residence = require('./Residence');
  console.log('   ✓ Residence importado:', Residence.name);

  console.log('\n3. Importando Amenity...');
  const Amenity = require('./Amenity');
  console.log('   ✓ Amenity importado:', Amenity.name);
  console.log('   ✓ Tipo:', typeof Amenity);
  console.log('   ✓ Es función:', typeof Amenity === 'function');

  console.log('\n4. Importando AmenityReservation...');
  const AmenityReservation = require('./AmenityReservation');
  console.log('   ✓ AmenityReservation importado:', AmenityReservation.name);
  console.log('   ✓ Tipo:', typeof AmenityReservation);

  console.log('\n5. Verificando que Amenity puede usarse en belongsTo...');
  console.log('   ✓ Amenity es:', Amenity);
  console.log('   ✓ Amenity.prototype:', Amenity.prototype);

  console.log('\n6. Verificando que User puede usarse en belongsTo...');
  console.log('   ✓ User es:', User);

  console.log('\n✓ Todos los modelos se importaron correctamente\n');

} catch (error) {
  console.error('\n✗ Error al importar modelos:', error.message);
  console.error(error.stack);
  process.exit(1);
}
