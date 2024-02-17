const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username cannot be empty"],
    unique: [true, "Username must be unique"],
  },
  email: {
    type: String,
    required: [true, "Email Adress cannot be empty"],
    unique: [true, "Email address must be unique"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    minlength: [8, "Password must be at least 8 characters"],
    // match: [
    //   /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/,
    //   "Password must have at least one uppercase letter and one number",
    // ],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
