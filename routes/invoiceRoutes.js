const express = require('express');
const { generateInvoice, viewInvoices } = require('../controllers/invoiceController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/generate', authMiddleware, generateInvoice);
router.get('/view', authMiddleware, viewInvoices);

module.exports = router;
