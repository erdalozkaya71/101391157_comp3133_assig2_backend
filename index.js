const dotenv = require("dotenv");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const userResolver = require("./resolver/userResolver");
const employeeResolver = require("./resolver/employeeResolver");

const SERVER_PORT = process.env.SERVER_PORT || 3000;

dotenv.config({ path: "./config.env" });

const app = express(); // Create an Express application

async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: [userResolver, employeeResolver],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const DB_HOST = "cluster0.phnktq8.mongodb.net";
  const DB_USER = "erdalozkaya";
  const DB_PASSWORD = "Okan2010";
  const DB_NAME = "comp3133_Assignment1";
  const DB_CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

  mongoose
    .connect(DB_CONNECTION_STRING, {})
    .then(() => {
      console.log("Success MongoDB connection");
      app.listen(3000, () =>
        console.log(
          `Server ready at http://localhost:${SERVER_PORT}${apolloServer.graphqlPath}`
        )
      );
    })
    .catch((err) => console.error("Error MongoDB connection", err));
}

startServer();
