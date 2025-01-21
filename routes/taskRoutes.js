const express = require('express');
const { getAllTasks, createTask, deleteTask, updateTask } = require('../controllers/taskController');

const router = express.Router();

// Route to get all tasks with optional query parameters for pagination
router.get('/', getAllTasks);

// Route to create a new task
router.post('/', createTask);

// Route to update a task by ID
router.put('/:id', updateTask); // Add this route for updating tasks

// Route to delete a task by ID
router.delete('/:id', deleteTask);

module.exports = router;
