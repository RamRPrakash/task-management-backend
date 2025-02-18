// src/routes/taskRoutes.js


const express = require("express");
const Task = require("../models/taskModel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require("../controllers/taskController.js");



// Create Task
router.post("/", authMiddleware, createTask);

// Get all tasks
router.get("/", authMiddleware, getTasks);

// Update task
router.put("/:id", authMiddleware, updateTask);

// Delete task
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
