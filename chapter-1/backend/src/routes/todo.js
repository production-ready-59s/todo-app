const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define the schema for Todo
const TodoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
});

// Create a model for Todo
const Todo = mongoose.model("Todo", TodoSchema);

router.post("/todos", async (req, res) => {
    const newTodo = new Todo({
        name: req.body.name,
        completed: req.body.completed,
    });

    try {
        const savedTodo = await newTodo.save();
        res.status(200).json(savedTodo);
    } catch (error) {
        res.status(500).json({error: error.toString()});
    }
});

router.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({error: error.toString()});
    }
});

router.put("/todos/:id", async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('No record with given id : ' + id)
    }

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {new: true});

        if (updatedTodo) {
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).json({message: 'Todo not found'});
        }
    } catch (error) {
        res.status(500).json({error: error.toString()});
    }
});

router.delete("/todos/:id", async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('No record with given id : ' + id)
    }

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (deletedTodo) {
            res.status(200).json({message: 'Todo deleted successfully'});
        } else {
            res.status(404).json({message: 'Todo not found'});
        }
    } catch (error) {
        res.status(500).json({error: error.toString()});
    }
});

module.exports = router;