const express = require('express');
const router = express.Router();
const inspectorController = require('../controllers/admin/inspector');

//ADMIN
router.post('/admin/createInspector', inspectorController.createInspector);
router.get('/admin/getAllInspectors', inspectorController.getAllInspectors);
router.get('/admin/getInspectorById/:id', inspectorController.getInspectorById);
router.put('/admin/updateInspectorById/:id', inspectorController.updateInspectorById);
router.put('/admin/updateLocation/:id', inspectorController.updateLocation);
router.delete('/admin/deleteInspectorById/:id', inspectorController.deleteInspectorById);
router.get('/is-site-allocated/:inspectorId/:siteId', inspectorController.isSiteAllocated);

module.exports = router;



