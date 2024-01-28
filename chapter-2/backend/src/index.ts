// Import the express library
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import {todoRoutes} from "./routes/todo";

// Create a new express application
const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
}));

mongoose.connect("mongodb://localhost/todosApp").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to the database", err);
});

app.use("/api", todoRoutes);

// Start the server, listening on port 4000
app.listen(4000, () => console.log('Express server started on port 4000'));