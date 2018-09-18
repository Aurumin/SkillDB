const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  skills: {
    type: [],
    required: true,
    name: {
      required: true,
      type: String
    },
    level: {
      required: true,
      type: Number
    }
  }
});

module.exports = mongoose.model("student", StudentSchema);
