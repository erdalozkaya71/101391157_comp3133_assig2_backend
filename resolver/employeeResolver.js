const Employee = require("../models/employeeModel"); // Adjust the path as necessary

const resolvers = {
  Query: {
    getAllEmployees: async () => {
      return await Employee.find({});
    },
    searchEmployeeById: async (_, { id }) => {
      return await Employee.findById(id);
    },
  },
  Mutation: {
    addNewEmployee: async (
      _,
      { first_name, last_name, email, gender, salary }
    ) => {
      const newEmployee = new Employee({
        first_name,
        last_name,
        email,
        gender,
        salary,
      });
      await newEmployee.save();
      return newEmployee;
    },
    updateEmployeeById: async (
      _,
      { id, first_name, last_name, email, gender, salary }
    ) => {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { $set: { first_name, last_name, email, gender, salary } },
        { new: true }
      );
      return updatedEmployee;
    },
    deleteEmployeeById: async (_, { id }) => {
      const deletedEmployee = await Employee.findByIdAndDelete(id);
      return deletedEmployee;
    },
  },
};

module.exports = resolvers;
