import express from "express";
const router = express.Router();
import {
  createTodo,
  delteTodo,
  getTodos,
  updateTodo,
} from "../controller/todoController";

router.get("/", getTodos);
router.post("/", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", delteTodo);

export default router;
