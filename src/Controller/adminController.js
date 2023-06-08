const AdminSchema = require("../Controller/adminController");
const User = require("../Model/Userschema");

//admin login
const adminLogin = async (req, res) => {
  try {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const ADMINUSERNAME = req.body.username;
    const ADMINPASSWORD = req.body.password;
    if (adminUsername == ADMINUSERNAME && adminPassword == ADMINPASSWORD) {
      res.send("admin logged in");
    } else {
      res.send("password or username mismatch");
    }
  } catch (er) {
    console.log("error", er);
  }
};

//...........get all users..........
const getallUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.log("error", err);
    // res.send("no users")
  }
};
//...........get users by id.........
const getusersByid = async (req, res) => {
  const id = req.params.id;
  try {
    const userData = await User.findById(id);
    res.send(userData);
  } catch (er) {
    console.log("error ", er);
  }
};

module.exports = { adminLogin, getallUsers ,getusersByid};
