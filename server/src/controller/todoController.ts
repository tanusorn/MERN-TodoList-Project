import { Request, Response } from "express";
import Todo from "../models/todoModel";

//Get Todo
export const getTodos = async (_req: Request, res: Response) => {
  try {
    const todos = await Todo.find().sort({ completed: 1, createdAt: -1 });
    res.json(todos);
    // res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Get Todo is Error" });
  }
};

//Create Todo
export const createTodo = async (_req: Request, res: Response) => {
  try {
    const { text } = _req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "text is requred" });
    }
    const todo = await Todo.create({ text: text.trim() });
    //Success to Create
    res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Create Todo is Error" });
  }
};

//Update Todo or Editing

export const updateTodo = async (_req: Request, res: Response) => {
  try {
    const { id } = _req.params;
    const { text, completed } = _req.body;

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo Not Found" });

    if (typeof text === "string") todo.text = text.trim();
    if (typeof completed === "boolean") todo.completed = completed;

    await todo.save();
    res.json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Editing is Error" });
  }
};

//Delete Todo
export const delteTodo = async (_req: Request, res: Response) => {
  try {
    const { id } = _req.params;

    const deletetodo = await Todo.findByIdAndDelete(id);

    if (!deletetodo) return res.status(404).json({ message: "Todo Not Found" });
    res.json({ deletetodo, message: "delete Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Delete is Error" });
  }
};
