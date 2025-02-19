const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js"); // Import database connection

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes.js");
const errorHandler = require("./middleware/errorMiddleware.js");



dotenv.config();
const app = express();


// ✅ CORS Configuration
const corsOptions = {
    origin: ["http://localhost:3000", "https://task-management-backend-v2.onrender.com"], // Allow FE URLs
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Enable if using cookies or authentication tokens
};
app.use(cors(corsOptions));
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error handling middleware (Always at the end)
app.use(errorHandler);



// Test Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    process.exit(1); // Exit process to avoid undefined behavior
});
