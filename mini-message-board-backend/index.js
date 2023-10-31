require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json());

const client = new MongoClient(DATABASE_URL);
let messagesCollection;

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("mini-message-board");
    messagesCollection = db.collection("messages");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

connectToDatabase().then(() => {
  console.log("DB Connected");
  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
});

app.post("/submit", async (req, res) => {
  const message = req.body.message;

  try {
    await messagesCollection.insertOne({ message });
    res.status(201).send("Message submitted successfully");
  } catch (error) {
    console.error("Error submitting message:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await messagesCollection.find().toArray();
    res.send(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/messages/:id", async (req, res) => {
  const messageId = req.params.id;

  try {
    const message = await messagesCollection.findOne({
      _id: new ObjectId(messageId),
    });
    if (!message) {
      res.status(404).send("Message not found");
    } else {
      res.send(message);
    }
  } catch (error) {
    console.error("Error retrieving message:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/messages/:id", async (req, res) => {
  const messageId = req.params.id;
  const message = req.body;

  try {
    const result = await messagesCollection.updateOne(
      { _id: new ObjectId(messageId) },
      { $set: message }
    );
    if (result.matchedCount === 0) {
      res.status(404).send("Message not found");
    } else {
      res.send("Message updated successfully");
    }
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/messages/:id", async (req, res) => {
  const messageId = req.params.id;

  try {
    const result = await messagesCollection.deleteOne({
      _id: new ObjectId(messageId),
    });
    if (result.deletedCount === 0) {
      res.status(404).send("Message not found");
    } else {
      res.status(204).send("Message deleted");
    }
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).send("Internal Server Error");
  }
});
