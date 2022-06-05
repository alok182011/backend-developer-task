const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  email: {
    type: String,
    unique: true,
  },
  createdAt: String,
});

module.exports = model("User", userSchema);
