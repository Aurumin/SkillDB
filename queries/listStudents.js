const Student = require("../models/student");

module.exports = async () => {
  return await Student.find()
    .select("firstName lastName skills -_id")
    .collation({ locale: "de" })
    .sort({ lastName: 1 });
};
