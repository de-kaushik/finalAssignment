
const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models/database');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const hackathonRoutes = require('./routes/hackathonRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const User = require('./models/employee');
const Hackathon = require('./models/hackathon');
const Participation = require('./models/participation');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/hackathons', authMiddleware, hackathonRoutes);
app.use('/hackathons',  employeeRoutes);
app.use('/hackathons', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server and sync the database
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

async function startServer() {
  try {
	// await sequelize.authenticate();
    // console.log('Connection to the database has been established successfully.');
    // await sequelize.sync();
    // Start the server
    app.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}


startServer();
User.sync();
Hackathon.sync();
Participation.sync();

User.belongsToMany(Hackathon, { through: Participation, as: 'hackathons', foreignKey: 'id' });
Hackathon.belongsToMany(User, { through: Participation, as: 'participants', foreignKey: 'id' });
