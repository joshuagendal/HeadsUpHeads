var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  commentText: String,
  userCommenting: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    email: { type: String, required: true }
  },
  created: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);
