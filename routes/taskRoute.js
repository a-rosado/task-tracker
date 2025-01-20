const express = require('express');
const { getAllTasks, createTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

// Route to get all tasks with optional query parameters for pagination
router.get('/', getAllTasks);

// Route to create a new task
router.post('/', createTask);

// Route to delete a task by ID
router.delete('/:id', deleteTask);

module.exports = router;
