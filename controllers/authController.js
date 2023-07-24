
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/employee');
const { registerValidation, loginValidation } = require('../middleware/validationMiddleware');
const dotenv = require('dotenv');
const { json } = require('sequelize');

dotenv.config();

const secretKey = process.env.JWT_SECRET;

async function register(req, res) {
  
  // const { error } = registerValidation(req.body);
  // if (error) {
    // return res.status(400).json({ message: 'Validation error', errors: error.details });
  // }

  try {
    const existingUser = await User.findOne({
      where: {
        $or: [{ username: req.body.username }, { email: req.body.email }],
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists.' });
    }

    const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      experienceLevel: req.body.experienceLevel,
    });

    return res.status(201).json({ message: 'User registered successfully.', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

async function login(req, res) {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({ message: 'Validation error', errors: error.details });
  }

  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

module.exports = { register, login };
