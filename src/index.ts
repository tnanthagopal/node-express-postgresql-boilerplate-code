import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import createUserTable from "./data/createUserTable";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", userRoutes);
app.use("/api", authRoutes);

//Error handling middleware
app.use(errorHandler);

//Testing postgres connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`Test! ${JSON.stringify(result.rows[0].current_database)}`);
});

//Create table before starting server
createUserTable();

//Server running
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
