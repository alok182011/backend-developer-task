const { model, Schema } = require("mongoose");

const thoughtSchema = {
  body: String,
  user_id: Schema.Types.ObjectId,
  username: {
    type: String,
    required: false,
    default: null,
  },
  createdAt: String,
  comments: [
    {
      _id: Schema.Types.ObjectId,
      body: String,
      user_id: Schema.Types.ObjectId,
      username: {
        type: String,
        required: false,
        default: null,
      },
      createdAt: String,
    },
  ],
};

module.exports = model("Thought", thoughtSchema);
