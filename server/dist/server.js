"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./config/db");
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({ origin: process.env.CLIENT_ORIGIN }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/", (_req, res) => res.send("MERN Todo API is running."));
app.use("/api/todos", todoRoutes_1.default);
async function start() {
    await (0, db_1.connectDB)(process.env.MONGODB_URI);
    app.listen(Number(PORT), "0.0.0.0", () => {
        console.log(`🚀 Server Run On ${PORT}`);
    });
}
start();
