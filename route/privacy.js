const express = require('express');
const terms = require('../controllers/admin/privacy');
const privacyRouter = express.Router()
privacyRouter.post('/addprivacy', terms.addprivacy);
privacyRouter.get('/getAllprivacy', terms.getAllprivacy);
privacyRouter.put('/updateprivacy/:id', terms.updateprivacy);
privacyRouter.delete('/deleteprivacy/:id', terms.deleteprivacy);
module.exports = privacyRouter;