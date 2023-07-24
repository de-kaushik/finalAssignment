
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../middleware/validationMiddleware');

router.post('/register', authController.register);

router.post('/login', loginValidation, authController.login);

module.exports = router;
