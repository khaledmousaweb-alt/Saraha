import express from "express";
import AuthRouter from "./src/Modules/Auth/Auth.router.js";
import UserRouter from "./src/Modules/user/user.router.js";
import MessageRouter from "./src/Modules/Message/Message.router.js";
import { DBConnection } from "./src/DB/connection.js";
import { configDotenv } from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

configDotenv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
DBConnection();

// CORS middleware
app.use(cors());

app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "frontend")));

// API routes
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/message", MessageRouter);
app.use((req, res) => {
  return res.status(404).send("Not Found Handler");
});

app.use((error, req, res, next) => {
  res.json({ message: error.message, status: 400 });
});

app.listen(process.env.PORT, () => {
  console.log("Server is Ruunnninnng");
});
