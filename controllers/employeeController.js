
const User = require('../models/employee');

async function getUserProfile(req, res) {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const userProfile = {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      experienceLevel: user.experienceLevel,
      businessUnit: user.businessUnit,
    };

    return res.status(200).json({ user: userProfile });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

async function getUserParticipatedHackathons(req, res) {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const participatedHackathons = await user.getHackathons();
    return res.status(200).json({ hackathons: participatedHackathons });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

module.exports = { getUserProfile, getUserParticipatedHackathons };
