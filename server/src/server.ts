import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db";
import todoRouter from "./routes/todoRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

app.use(morgan("dev"));

app.get("/", (_req, res) => res.send("MERN Todo API is running."));
app.use("/api/todos", todoRouter);

async function start() {
  await connectDB(process.env.MONGODB_URI as string);
  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`🚀 Server Run On ${PORT}`);
  });
}

start();
