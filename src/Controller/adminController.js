const User = require("../Model/Userschema");
const jwt = require("jsonwebtoken");

//----------admin login------------
const adminLogin = async (req, res) => {
  
    const adminUsername = process.env.ADMINUSERNAME;
    const adminPassword = process.env.ADMINPASSWORD;

    const ADMINUSERNAME = req.body.username;
    const ADMINPASSWORD = req.body.password;
    if (adminUsername == ADMINUSERNAME && adminPassword == ADMINPASSWORD) {
      const token = jwt.sign({ username: ADMINUSERNAME }, "admin", {
        expiresIn: "24h",
      });
      return res.json({
        status: "success",
        message: "Admin succefully logged in ",
        data: token,
      });
    } else {
      res.json({
        status: "failure",
        message: "password or username mismatch",
        error_message: "password or username mismatch",
      });
    }

};

//...........get all users..........
const getallUsers = async (req, res) => {

    const users = await User.find();
    res.json(users);

};
//...........get users by id.........
const getusersByid = async (req, res) => {
  const id = req.params.id;
  
    const userData = await User.findById(id);
    res.json(userData);

};

module.exports = { adminLogin, getallUsers, getusersByid };
