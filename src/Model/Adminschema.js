const mongoose = require("mongoose");

const dataschema = new mongoose.Schema({
  username: String,
  password: String,
});
const AdminSchema = mongoose.model("AdminSchema", dataschema);

module.exports = {AdminSchema};
