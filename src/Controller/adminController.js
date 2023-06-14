const User = require("../Model/Userschema");
const jwt = require("jsonwebtoken");

//----------admin login------------
const adminLogin = async (req, res) => {
  try {
    const adminUsername = process.env.ADMINUSERNAME;
    const adminPassword = process.env.ADMINPASSWORD;

    const ADMINUSERNAME = req.body.username;
    const ADMINPASSWORD = req.body.password;
    if (adminUsername == ADMINUSERNAME && adminPassword == ADMINPASSWORD) {
      const token = jwt.sign({ username: ADMINUSERNAME }, "admin", {
        expiresIn: "24h",
      });
      res.json({ auth: true, message: "admin logined ", token });
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

module.exports = { adminLogin, getallUsers, getusersByid };
