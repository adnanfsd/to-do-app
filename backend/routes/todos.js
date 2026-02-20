import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// GET /api/todos — Fetch all todos
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/todos — Create a new todo
router.post("/", async (req, res) => {
    try {
        const { description, status } = req.body;
        if (!description || !description.trim()) {
            return res.status(400).json({ message: "Description is required" });
        }
        const todo = new Todo({
            description: description.trim(),
            status: status || "ongoing",
        });
        const saved = await todo.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/todos/:id — Update a todo (toggle status)
router.put("/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        if (req.body.description !== undefined) {
            todo.description = req.body.description;
        }
        if (req.body.status !== undefined) {
            todo.status = req.body.status;
        }
        const updated = await todo.save();
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/todos/:id — Delete a todo
router.delete("/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json({ message: "Todo deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
