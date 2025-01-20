require('dotenv').config();
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/tasks', taskRoutes); // Task-related routes

// Error handling for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler for unexpected server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong, please try again later' });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
