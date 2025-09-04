"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const todoModel_1 = __importDefault(require("../models/todoModel"));
//Get Todo
const getTodos = async (_req, res) => {
    try {
        const todos = await todoModel_1.default.find().sort({ completed: 1, createdAt: -1 });
        res.json(todos);
        // res.json(todos);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Get Todo is Error" });
    }
};
exports.getTodos = getTodos;
//Create Todo
const createTodo = async (_req, res) => {
    try {
        const { text } = _req.body;
        if (!text || !text.trim()) {
            return res.status(400).json({ message: "text is requred" });
        }
        const todo = await todoModel_1.default.create({ text: text.trim() });
        //Success to Create
        res.status(201).json(todo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Create Todo is Error" });
    }
};
exports.createTodo = createTodo;
//Update Todo or Editing
const updateTodo = async (_req, res) => {
    try {
        const { id } = _req.params;
        const { text, completed } = _req.body;
        const todo = await todoModel_1.default.findById(id);
        if (!todo)
            return res.status(404).json({ message: "Todo Not Found" });
        if (typeof text === "string")
            todo.text = text.trim();
        if (typeof completed === "boolean")
            todo.completed = completed;
        await todo.save();
        res.json(todo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Editing is Error" });
    }
};
exports.updateTodo = updateTodo;
//Delete Todo
const delteTodo = async (_req, res) => {
    try {
        const { id } = _req.params;
        const deletetodo = await todoModel_1.default.findByIdAndDelete(id);
        if (!deletetodo)
            return res.status(404).json({ message: "Todo Not Found" });
        res.json({ deletetodo, message: "delete Success" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Delete is Error" });
    }
};
exports.delteTodo = delteTodo;
