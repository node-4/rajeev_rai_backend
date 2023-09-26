const express = require('express');
const terms = require('../controllers/admin/termsAndCondition');

const termsRouter = express.Router();
termsRouter.post('/terms', terms.addterms);
termsRouter.get('/termsAll', terms.getAllterms);
termsRouter.put('/Updateterms/:id', terms.updateterms);
termsRouter.delete('/Deleteterms/:id', terms.DeleteTerms);
module.exports = termsRouter;