const Task = require("../models/taskModel.js"); // Import Task model
const logger = require("../utils/logger.js");

// Create Task
const createTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;

        // Validate input
        if (!title || !description || !dueDate) {
            logger.warn("Missing required fields for task creation");
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTask = new Task({
            title,
            description,
            dueDate,
            user: req.user, // User ID from auth middleware
        });

        const savedTask = await newTask.save(); // Save task to database
        // logger.info(`Task created: ${savedTask.title}`);
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: savedTask,
        });
    } catch (error) {
        console.error(error);
        // logger.error(`Error creating task: ${error.message}`);
        res.status(500).json({ message: "Failed to create task" });
    }
};

// Get All Tasks
// const getTasks = async (req, res) => {
//     try {
//         // const tasks = await Task.find({ user: req.user }); // Find tasks belonging to the logged-in user
//         const tasks = await Task.find();
//         res.status(200).json({ success: true, data: tasks });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Failed to retrieve tasks" });
//     }
// };

const getTasks = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;  // Default to page 1 and 10 items per page
    try {
        //const tasks = await Task.find({ userId: req.user })
        const tasks = await Task.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const totalTasks = await Task.countDocuments({ userId: req.user });

        res.status(200).json({
            tasks,
            totalTasks,
            totalPages: Math.ceil(totalTasks / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        res.status(400).json({ message: 'Failed to fetch tasks', error });
    }
};


// Update Task
const updateTask = async (req, res) => {
    const { id } = req.params; // Task ID from URL params
    const { title, description, dueDate } = req.body; // New task data

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Check if the user is authorized to update the task
        if (task.user.toString() !== req.user) {
            return res.status(403).json({ message: "You are not authorized to update this task" });
        }

        // Update the task fields
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;

        const updatedTask = await task.save(); // Save the updated task
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: updatedTask,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update task" });
    }
};

// Delete Task
const deleteTask = async (req, res) => {
    const { id } = req.params; // Task ID from URL params

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Check if the user is authorized to delete the task
        if (task.user.toString() !== req.user) {
            return res.status(403).json({ message: "You are not authorized to delete this task" });
        }

        await Task.deleteOne({ _id: id }); // Delete task from the database
        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete task" });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask }; 
