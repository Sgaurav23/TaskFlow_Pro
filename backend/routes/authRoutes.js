const express = require('express');
const router = express.Router();
const { User } = require('../schema');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../authMiddleware'); // Ensure correct import

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    // Directly store the password without hashing (temporary for debugging)
    user = new User({ name, email, password });
    await user.save();
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    console.log('Stored password:', user.password);
    console.log('Entered password:', password);

    if (password === user.password) {
      const payload = { user: { id: user.id } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      });
    } else {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Fetch User Data Endpoint
router.get('/user', async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);
    res.json(user);
  } catch (err) {
    console.error('Error fetching user data:', err.message);
    res.status(500).send('Server error');
  }
});

router.post('/tasks', authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.user.id;
  if (!title) {
    return res.status(400).json({ msg: 'Title is required' });
  }
  try {
    const task = new Task({ title, description, status: 'pending', userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
