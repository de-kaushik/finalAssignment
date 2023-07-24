
const Hackathon = require('../models/Hackathon');

async function createHackathon(req, res) {
  const {
    name,
    description,
    technologyStack,
    minimumRequirement,
    startDate,
    endDate,
    registrationStartDate,
    registrationEndDate,
    status,
  } = req.body;

  try {
    const newHackathon = await Hackathon.create({
      name,
      description,
      technologyStack,
      minimumRequirement,
      startDate,
      endDate,
      registrationStartDate,
      registrationEndDate,
      status,
    });

    return res.status(201).json({ message: 'Hackathon created successfully.', hackathon: newHackathon });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

async function getAllHackathons(req, res) {
  try {
    const hackathons = await Hackathon.findAll();
    return res.status(200).json({ hackathons });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

module.exports = { createHackathon, getAllHackathons };
