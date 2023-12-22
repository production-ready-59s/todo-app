// Import the express library
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');

const todoRoutes = require('./routes/todo');

// Create a new express application
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
}));

mongoose.connect("mongodb://localhost/todosApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to the database", err);
});


app.use("/api", todoRoutes); // Here we are using the

// Start the server, listening on port 4000
app.listen(4000, () => console.log('Express server started on port 4000'));