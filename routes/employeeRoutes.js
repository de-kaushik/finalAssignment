
const express = require('express');
const router = express.Router();
const userController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, userController.getUserProfile);

router.get('/hackathons/participated', authMiddleware, userController.getUserParticipatedHackathons);

module.exports = router;
