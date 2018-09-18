const Student = require("../models/student");

module.exports = async StudentProps => {
  return await new Student(StudentProps).save();
};
