const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/auth-demo');

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    await User.create({ username, password: hash });
    res.send('User registered');
  } catch (err) {
    res.status(400).send('User already exists');
  }
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
  res.json({ token });
});

// Secured route
app.get('/secure', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).send('No token');
  try {
    const decoded = jwt.verify(auth.split(' ')[1], 'secret');
    res.send(`Welcome user ${decoded.userId}`);
  } catch {
    res.status(401).send('Invalid token');
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
