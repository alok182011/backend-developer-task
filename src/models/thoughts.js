const { model, Schema } = require("mongoose");

const thoughtSchema = {
  body: String,
  user_id: Schema.Types.ObjectId,
  username: String,
  createdAt: String,
  anoymous: Boolean,
  comments: [
    {
      _id: Schema.Types.ObjectId,
      body: String,
      user_id: Schema.Types.ObjectId,
      anoymous: Boolean,
      username: String,
      createdAt: String,
    },
  ],
};

module.exports = model("Thought", thoughtSchema);
