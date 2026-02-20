import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import todoRoutes from "./routes/todos.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Health check
app.get("/", (req, res) => {
    res.json({ message: "ToDo API is running 🚀" });
});

// Connect to MongoDB and start server
async function startServer() {
    try {
        let mongoUri = process.env.MONGO_URI;

        // If no valid MONGO_URI, use in-memory MongoDB
        if (!mongoUri || mongoUri.includes("<username>") || mongoUri.includes("xxxxx")) {
            console.log("⚡ No valid MONGO_URI found. Starting in-memory MongoDB...");
            const mongod = await MongoMemoryServer.create();
            mongoUri = mongod.getUri();
            console.log("✅ In-memory MongoDB started");
        }

        await mongoose.connect(mongoUri);
        console.log("✅ Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ Server startup error:", err.message);
        process.exit(1);
    }
}

startServer();
