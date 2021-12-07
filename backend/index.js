const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const { updateDB } = require("./om2m.js");
const Reading = require("./ReadingModel");

app.use(express.json());
app.use(cors());

// DB config
const db =
  "mongodb+srv://user:J5dKElt0zkqOiyfY@cluster0.vfbpl.mongodb.net/WearableDeviceDB?retryWrites=true&w=majority";

// Connect to DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// Get last 'n' readings. Limit specified in query string.
app.get("/readings", async (req, res) => {
  await updateDB();
  Reading.find()
    .sort("-timestamp")
    .lean()
    .then((readings) => res.json({ readings }))
    .catch((error) => res.json({ error: error.message, readings: [] }));
});

// Get readings from a certain range. start and end specified in query string.
app.get("/readings-range", async (req, res) => {
  await updateDB();
  if (!req.query.start || !req.query.end)
    res.status(400).json("start or end field missing");
  Reading.find({ timestamp: { $gte: start, $lte: end } })
    .lean()
    .then((readings) => res.json({ readings }))
    .catch((error) => res.json({ error: error.message, readings: [] }));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
