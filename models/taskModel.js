const pool = require('../database/connection');

const Task = {
    getAll: async (limit = 10, offset = 0) => {
        const [rows] = await pool.query(
            'SELECT * FROM tasks ORDER BY created_at DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );
        return rows;
    },

    create: async (task) => {
        if (!task.title || task.title.trim() === '') {
            throw new Error('Task title is required');
        }
        const [result] = await pool.query(
            'INSERT INTO tasks (title, description) VALUES (?, ?)',
            [task.title, task.description]
        );
        return result.insertId;
    },

    update: async (id, task) => {
        if (!task.title || task.title.trim() === '') {
            throw new Error('Task title is required');
        }
        const [result] = await pool.query(
            'UPDATE tasks SET title = ?, description = ?, updated_at = NOW() WHERE id = ?',
            [task.title, task.description, id]
        );
        return result.affectedRows;
    },

    delete: async (id) => {
        const [result] = await pool.query(
            'DELETE FROM tasks WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    },

    search: async (keyword) => {
        const [rows] = await pool.query(
            'SELECT * FROM tasks WHERE title LIKE ?',
            [`%${keyword}%`]
        );
        return rows;
    },

    filterByStatus: async (status) => {
        const [rows] = await pool.query(
            'SELECT * FROM tasks WHERE status = ?',
            [status]
        );
        return rows;
    },
};

module.exports = Task;
