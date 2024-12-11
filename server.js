require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// MongoDB connection URI (replace with your actual MongoDB URI if using a cloud database)
const MONGO_URI =
  // process.env.MONGO_URI ||
  "mongodb+srv://ashiquealisoftbuilders:c1K5dUmuEpCktGN1@cluster0.z21td.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Use environment variable if possible

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
// c1K5dUmuEpCktGN1;
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
  console.log("====================================");
  console.log("hello");
  console.log("====================================");
  try {
    // const message = new Message({ text: "Hello World" });
    // await message.save();
    res.send("Hello World saved to database333333333333!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to retrieve all messages
app.get("/", async (req, res) => {
  // try {
  //   const messages = await Message.find();
  //   res.json(messages);
  // } catch (err) {
  //   res.status(500).send(err.message);
  // }

  res.status(200).send({ messge: "hi tehre" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
