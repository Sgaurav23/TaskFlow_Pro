const express = require('express');
const router = express.Router();
const { Task } = require('../schema');
const { authMiddleware } = require('../authMiddleware');

// Add task
router.post('/', authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.user.id;
  if (!title) {
    return res.status(400).json({ msg: 'Title is required' });
  }
  try {
    const task = new Task({ title, description, userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get tasks
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.user.id });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update task
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
