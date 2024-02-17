const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
      "Please fill a valid email address",
    ],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"],
    set: (value) => Math.round(value * 100) / 100,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
