# Guía de Solución de Problemas - Modelo Activity

## Problema Detectado

El modelo `Activity` no se está registrando correctamente en Sequelize y está mostrando los campos del modelo `Amenity`.

## Pasos para Diagnosticar y Solucionar

### 1. Ejecutar Script de Limpieza de Caché

Este script verificará que el archivo `Activity.js` tenga el contenido correcto:

```bash
cd Backend
node src/scripts/clear-sequelize-cache.js
```

**Qué verificar:**
- ✅ Debe mostrar que `Activity.js` tiene las palabras clave: `titulo`, `fecha_inicio`, `max_participantes`, `organizador_id`
- ❌ NO debe mostrar campos de Amenity como: `capacidad_maxima`, `horario_inicio`, `disponible_reserva`

### 2. Ejecutar Script de Diagnóstico Detallado

Este script mostrará exactamente cómo se está cargando el modelo Activity:

```bash
node src/scripts/diagnose-activity.js
```

**Qué verificar:**
- La tabla debe ser `activities` (no `amenities`)
- Los campos deben incluir `titulo`, `fecha_inicio`, `max_participantes`
- `Activity === Amenity` debe ser `false`
- `Activity` debe aparecer en `sequelize.models`

### 3. Reiniciar el Servidor

Después de ejecutar los scripts de diagnóstico:

```bash
# Detener el servidor si está corriendo (Ctrl+C)

# Limpiar caché de Node.js (opcional pero recomendado)
npm run clean  # si existe este comando, sino:
rm -rf node_modules/.cache  # en Linux/Mac
# o manualmente borrar node_modules/.cache en Windows

# Reiniciar el servidor
npm run dev
```

### 4. Verificar los Modelos

Una vez reiniciado el servidor, ejecutar:

```bash
node src/scripts/verify-models.js
```

**Resultado esperado:**
```
2️⃣  Verificando modelos registrados en Sequelize:
   Modelos encontrados: User, Residence, Activity, Amenity, ... (Activity debe estar presente)
   ✅ Todos los modelos esperados están registrados

4️⃣  Verificando estructura de modelos:
   📋 Activity:
      - Campos: id, titulo, descripcion, tipo, fecha_inicio, fecha_fin, ubicacion, organizador_id, max_participantes, inscritos_count, estado, created_at, updated_at
      - Tabla: activities
      ✅ Campos críticos presentes
```

## Posibles Causas y Soluciones

### Causa 1: Caché de Node.js
**Síntoma:** El servidor usa una versión antigua del modelo.

**Solución:**
1. Detener el servidor completamente
2. Borrar el caché: `rm -rf node_modules/.cache`
3. Reiniciar

### Causa 2: Archivo Corrupto o con Codificación Incorrecta
**Síntoma:** El archivo `Activity.js` tiene contenido inesperado.

**Solución:**
El archivo `Activity.js` ha sido recreado completamente con codificación UTF-8 limpia. Si el problema persiste:
1. Abre `backend/src/models/Activity.js` en tu editor
2. Verifica que el contenido coincida con el esperado (debe tener `titulo`, `fecha_inicio`, etc.)
3. Si ves campos extraños, el archivo puede haberse corrompido

### Causa 3: Problema de Sincronización de Base de Datos
**Síntoma:** La base de datos tiene una estructura diferente a los modelos.

**Solución:**
```bash
# ADVERTENCIA: Esto borrará todos los datos
# Solo usar en desarrollo

# Editar temporalmente src/index.js línea 75:
# Cambiar: sequelize.sync({ alter: true })
# Por:     sequelize.sync({ force: true })

# Reiniciar el servidor
npm run dev

# Después de que arranque exitosamente, volver a cambiar:
# Por:     sequelize.sync({ alter: true })
```

## Archivos Modificados en este Fix

1. **backend/src/models/Activity.js** - Recreado completamente
2. **backend/src/models/index.js** - Agregadas validaciones para Activity
3. **backend/src/routes/complaints.js** - Corregido router (antes tenía código de modelo)
4. **backend/src/index.js** - Agregado logging de modelos registrados
5. **backend/src/scripts/verify-models.js** - Script de verificación general
6. **backend/src/scripts/diagnose-activity.js** - Script de diagnóstico específico
7. **backend/src/scripts/clear-sequelize-cache.js** - Script de limpieza de caché

## Contacto de Soporte

Si después de seguir estos pasos el problema persiste:
1. Ejecuta todos los scripts de diagnóstico
2. Copia el output completo
3. Verifica el contenido del archivo `backend/src/models/Activity.js`
4. Comparte esta información para análisis adicional
