const dotenv = require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Invalid password");
      }
      return { user };
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        throw new Error("Username or email already in use");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();

      return { user };
    },
  },
};

module.exports = resolvers;
