const express = require('express');
const router = express.Router();
const inspectorController = require('../controllers/admin/image');

//ADMIN
router.post('/admin/uploadRouter', inspectorController.uploadRouter);
// router.get('/admin/getAllInspectors', inspectorController.getAllInspectors);
// router.get('/admin/getInspectorById/:id', inspectorController.getInspectorById);
// router.put('/admin/updateInspectorById/:id', inspectorController.updateInspectorById);
// router.delete('/admin/deleteInspectorById/:id', inspectorController.deleteInspectorById);


module.exports = router;




