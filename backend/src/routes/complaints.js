// Backend/src/routes/complaints.js
const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const { authenticateToken } = require('../middleware/auth');

// Aplicar autenticación a todas las rutas
router.use(authenticateToken);

// Obtener todas las quejas
router.get('/', complaintController.getAllComplaints);

// Obtener estadísticas de quejas
router.get('/statistics', complaintController.getComplaintsStatistics);

// Obtener queja por ID
router.get('/:id', complaintController.getComplaintById);

// Crear nueva queja
router.post('/', complaintController.createComplaint);

// Actualizar queja
router.put('/:id', complaintController.updateComplaint);

// Cambiar estado de queja
router.patch('/:id/status', complaintController.updateComplaintStatus);

// Eliminar queja
router.delete('/:id', complaintController.deleteComplaint);

// Obtener quejas por usuario
router.get('/user/:user_id', complaintController.getComplaintsByUser);

module.exports = router;
