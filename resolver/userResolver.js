const dotenv = require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    // User login resolver
    login: async (_, { username, email, password }) => {
      const user = username
        ? await User.findOne({ username })
        : await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Password: ", password);
      console.log("user.password: ", user.password);
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Invalid password");
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return {
        token,
        user,
      };
    },
  },
  Mutation: {
    // User signup resolver
    signup: async (_, { username, email, password }) => {
      console.log("Signup started for:", username, email); // Logging input

      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        console.log("Username or email already in use"); // Logging existing user error
        throw new Error("Username or email already in use");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();
      console.log("User saved:", user); // Logging the saved user

      //A function to generate JWT tokens
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      console.log("Token generated:", token); // Logging the token

      return {
        token,
        user,
      };
    },
  },
};

module.exports = resolvers;
