const Student = require("../models/student");

module.exports = async () => {
  return await Student.find()
    .select("firstName lastName skills.name -_id")
    .collation({ locale: "de" })
    .sort({ lastName: 1 });
};
