const router = require('express').Router();
const {calculateLoan} = require('../controllers/loans.controller');

router.post('/calculate', calculateLoan); 






module.exports = router;