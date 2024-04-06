const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type AuthPayload {
    user: User!
  }

  type Query {
    login(username: String, email: String, password: String!): AuthPayload
    getAllEmployees: [Employee!]!
    searchEmployeeById(id: ID!): Employee
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload
    addNewEmployee(
      first_name: String!
      last_name: String!
      email: String!
      gender: String!
      salary: Float!
    ): Employee
    updateEmployeeById(
      id: ID!
      first_name: String
      last_name: String
      email: String
      gender: String
      salary: Float
    ): Employee
    deleteEmployeeById(id: ID!): Employee
  }
`;
module.exports = typeDefs;
