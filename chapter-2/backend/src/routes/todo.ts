import express, {Request, Response} from "express";
import {createTodo, deleteTodo, getAllTodos, ITodo, updateTodo} from "../db/utils";

export const todoRoutes = express.Router();

todoRoutes.post("/todos", async (req: Request<Record<string, unknown>, ITodo | ErrorResponse, ITodo>, res: Response<ITodo | ErrorResponse>) => {
  try {
    const savedTodo = await createTodo(req.body);
    res.status(200).json(savedTodo);
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
});

todoRoutes.get("/todos", async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
});

interface ErrorResponse {
  message?: string;
  error?: string;
}

todoRoutes.put("/todos/:id", async (req: Request<{
  id: string
}, ITodo | ErrorResponse, ITodo>, res: Response<ITodo | ErrorResponse>) => {
  try {
    const updatedTodo = await updateTodo(req.params.id, req.body);
    if (updatedTodo) {
      res.status(200).json(updatedTodo);
    } else {
      res.status(404).json({message: 'Todo not found'});
    }
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
});

todoRoutes.delete("/todos/:id", async (req: Request<{ id: string }, ITodo | ErrorResponse, ITodo>, res) => {
  try {
    const deletedTodo = await deleteTodo(req.params.id);
    if (deletedTodo) {
      res.status(200).json({message: 'Todo deleted successfully'});
    } else {
      res.status(404).json({message: 'Todo not found'});
    }
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
});
