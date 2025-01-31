const Task = require('../models/taskModel');

const getAllTasks = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query; // Support pagination via query parameters
    const tasks = await Task.getAll(Number(limit), Number(offset));
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Task title is required' }); // Validation for title
    }

    const id = await Task.create({ title: title.trim(), description });
    res.status(201).json({ id, message: 'Task created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task', details: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Task ID is required' }); // Validation for ID
    }

    const rowsDeleted = await Task.delete(id);
    if (rowsDeleted) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task', details: err.message });
  }
};

const updateTask = async (req, res) => {
    try {

      const { id } = req.params; // Get task ID from the route parameter
      const updates = req.body; // Get the fields to update from the request body
  
      if (!id) {

        return res.status(400).json({ error: 'Task ID is required' });
      }
  
      if (!updates.title || updates.title.trim() === '') {
        return res.status(400).json({ error: 'Task title is required' });
      }
  
      const updatedTask = await Task.update(id, updates); // Assuming `Task.update` exists in your model
      if (updatedTask) {
        console.log('Updated Task:', updatedTask);
        res.status(200).json({ message: 'Task updated successfully', updatedTask });
      } else {
        console.warn('Task not found for ID:', id);
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (err) {
      console.error('Error Updating Task:', err);
      res.status(500).json({ error: 'Failed to update task', details: err.message });
    }
  };
  

module.exports = { getAllTasks, createTask, deleteTask, updateTask };
