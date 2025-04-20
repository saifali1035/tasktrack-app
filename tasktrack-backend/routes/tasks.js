const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Corrected import for Task model

// Get all tasks (with the new fields)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create a new task (with date field)
router.post('/', async (req, res) => {
  try {
    const { title, date } = req.body; // Extract title and date
    const newTask = new Task({
      title,
      date: date || new Date(), // Use provided date or default to current date
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update a task (toggle done)
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');
    
    task.done = req.body.done; // Toggle done field
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send('Task not found');
    
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

