const express = require('express');
const router = express.Router();
const clientController = require('../controllers/admin/client'); // Import the clientController module

// Route to create a new client
router.post('/clients', clientController.createClient);

// Route to get a client by ID
router.get('/clients/:id', clientController.getClientById);
router.get('/clients', clientController.getAllClient);

// Route to update a client by ID
router.put('/clients/:id', clientController.updateClientById);

// Route to delete a client by ID
router.delete('/clients/:id', clientController.deleteClientById);

module.exports = router;
