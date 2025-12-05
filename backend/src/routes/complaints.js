const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');
const { ROLES } = require('../config/constants');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Obtener todas las quejas
router.get('/', complaintController.getAllComplaints);

// Obtener queja por ID
router.get('/:id', complaintController.getComplaintById);

// Crear queja
router.post('/', complaintController.createComplaint);

// Actualizar queja
router.put('/:id', complaintController.updateComplaint);

// Responder a una queja (Solo Admin y SuperAdmin)
router.post('/:id/respond',
  authorizeRoles(ROLES.ADMINISTRADOR, ROLES.SUPER_ADMIN),
  complaintController.respondToComplaint
);

// Obtener quejas por usuario
router.get('/user/:user_id', complaintController.getComplaintsByUser);

// Eliminar queja (Solo Admin y SuperAdmin)
router.delete('/:id',
  authorizeRoles(ROLES.ADMINISTRADOR, ROLES.SUPER_ADMIN),
  complaintController.deleteComplaint
);

module.exports = router;
