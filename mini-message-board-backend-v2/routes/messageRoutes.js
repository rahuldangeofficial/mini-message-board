const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.post("/", messageController.createMessage);
router.get("/", messageController.getMessages);
router.get("/:id", messageController.getMessage);
router.put("/:id", messageController.updateMessage);
router.delete("/:id", messageController.deleteMessage);

module.exports = router;
