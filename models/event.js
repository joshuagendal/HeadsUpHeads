var mongoose = require("mongoose");

var eventSchema = mongoose.Schema({
  eventTitle: { type: String, required: true },
  eventDescription: { type: String, required: true },
  userThatAddedEvent: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String, required: true }
  },
  created: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("Event", eventSchema);
