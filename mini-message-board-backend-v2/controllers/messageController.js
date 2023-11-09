const Message = require("../models/Message");

// Create a new message
exports.createMessage = async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get a specific message by ID
exports.getMessage = async (req, res) => {
    const messageId = req.params.id;

    try {
        const message = await Message.findById(messageId);
        if (!message) {
            res.status(404).json({ error: "Message not found" });
        } else {
            res.json(message);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update a message by ID
exports.updateMessage = async (req, res) => {
    const messageId = req.params.id;

    try {
        const message = await Message.findByIdAndUpdate(messageId, req.body, {
            new: true,
        });
        if (!message) {
            res.status(404).json({ error: "Message not found" });
        } else {
            res.json(message);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a message by ID
exports.deleteMessage = async (req, res) => {
    const messageId = req.params.id;
    console.log("Deleting message with ID:", messageId);

    try {
        const message = await Message.findOneAndDelete({ _id: messageId });
        if (!message) {
            res.status(404).json({ error: "Message not found" });
        } else {
            res.status(204).json();
        }
    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
