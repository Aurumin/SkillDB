const Mongoose = require("mongoose");

const Student = require("../models/student");

const Create = require("../queries/createStudent");
const List = require("../queries/listStudents");

module.exports = {
  async createExampleStudent(req, res) {
    res.send(
      await Create({
        lastName: "Pan",
        skills: [
          { name: "ExampleSkill", level: 2 },
          { name: "SuperSkill", level: 3 },
          { name: "Java", level: 2 },
          { name: "Python", level: 3 }
        ]
      })
    );
  },

  async listStudents(req, res) {
    res.send(await List());
  }
};
