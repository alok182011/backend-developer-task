const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  email: String,
  createdAt: String,
});

module.exports = model("User", userSchema);
