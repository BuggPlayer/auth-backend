const mongoose = require("mongoose");
const Modelschema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  passwordHash: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
  },
});
module.exports = mongoose.model("userdata", Modelschema);
