const express = require('express');
const router = express.Router();
const { submitInquiry, getInquiries, deleteInquiry } = require('../controllers/contactController');

router.post('/', submitInquiry);
router.get('/', getInquiries);
router.delete('/:id', deleteInquiry);

module.exports = router;