const mongoose = require("mongoose");

const StudentsController = require("../controllers/studentsController");

module.exports = app => {
  // Watch for incoming requests of method get
  // to the route http://localhost:3050/api

  app.get("/api/students/hu", StudentsController.createExampleStudent);
  app.get("/api/students/list", StudentsController.listStudents);
};
