"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const todoController_1 = require("../controller/todoController");
router.get("/", todoController_1.getTodos);
router.post("/", todoController_1.createTodo);
router.patch("/:id", todoController_1.updateTodo);
router.delete("/:id", todoController_1.delteTodo);
exports.default = router;
