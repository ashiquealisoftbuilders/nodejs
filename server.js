require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// Correct MongoDB URI
const MONGO_URI = "mongodb://localhost:27017/dummy"; // or "mongodb://127.0.0.1:27017/dummy"

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Define a simple Message schema and model
const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const Message = mongoose.model("Message", messageSchema);

// Route to add a "Hello World" message to the database
app.get("/add", async (req, res) => {
  try {
    const message = new Message({ text: "Hello World" });
    await message.save();
    res.send("Hello World saved to database!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to retrieve all messages
app.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
