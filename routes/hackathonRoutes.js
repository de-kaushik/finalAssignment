
const express = require('express');
const router = express.Router();
const hackathonController = require('../controllers/hackathonController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/hackathons', authMiddleware, hackathonController.createHackathon);

router.get('/hackathons', hackathonController.getAllHackathons);

module.exports = router;
