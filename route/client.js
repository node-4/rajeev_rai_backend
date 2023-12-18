const express = require('express');
const router = express.Router();
const clientController = require('../controllers/admin/client'); // Import the clientController module

router.post('/clients', clientController.createClient);
router.get('/clients/:id', clientController.getClientById);
router.get('/clients', clientController.getAllClient);
router.put('/clients/:id', clientController.updateClientById);
router.delete('/clients/:id', clientController.deleteClientById);

module.exports = router;
