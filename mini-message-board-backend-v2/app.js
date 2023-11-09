const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const messageRoutes = require("./routes/messageRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL);

app.use("/messages", messageRoutes);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
