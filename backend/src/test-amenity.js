// Script para diagnosticar el problema con Amenity
console.log('=== Iniciando diagnóstico de Amenity ===\n');

try {
  console.log('1. Importando sequelize...');
  const sequelize = require('./config/database');
  console.log('   ✓ Sequelize importado\n');

  console.log('2. Intentando importar Amenity...');
  const Amenity = require('./models/Amenity');

  console.log('   Amenity importado:', Amenity);
  console.log('   Tipo de Amenity:', typeof Amenity);
  console.log('   Es función?:', typeof Amenity === 'function');
  console.log('   Nombre:', Amenity.name);

  if (typeof Amenity === 'function') {
    console.log('   ✓ Amenity es una función válida\n');
  } else {
    console.log('   ✗ ERROR: Amenity NO es una función\n');
    console.log('   Valor de Amenity:', JSON.stringify(Amenity, null, 2));
  }

  console.log('3. Verificando estructura del modelo...');
  console.log('   Amenity.tableName:', Amenity.tableName);
  console.log('   Amenity.getTableName():', Amenity.getTableName ? Amenity.getTableName() : 'N/A');

} catch (error) {
  console.error('\n✗ Error al importar Amenity:');
  console.error('   Mensaje:', error.message);
  console.error('   Stack:', error.stack);
}
