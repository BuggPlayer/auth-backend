const userModel = require("../Model/Datamodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@desc Regiser  user
//@router POST register
//@access user
exports.userRegister = async (req, res) => {
  console.log("user", req.body);
  try {
    const userregister = await userModel.create({
      ...req.body,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
    });

    res.status(200).json({ success: true, data: userregister });

    if (!userregister) {
      res.status(500).json({ success: false, mesage: "user not find" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(200).json({ success: false, error: error.mesage });
  }
};

//@desc Login  user
//@router Post
//@access user
exports.loginUser = async (req, res) => {
  console.log("userlogin", req.body);
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ success: false, message: "user no found" });
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      "secret",
      { expiresIn: "1d" }
    );

    return res.status(200).send({ user: user.email, token: token });
  } else {
    res.status(400).send("passs is wrong");
  }
};

//@desc Get all user
//@router GET api/v1/user
//@access users
exports.getAllUser = async (req, res) => {
  try {
    const getalluser = await userModel.find();
    res.status(200).json({ success: true, data: getalluser });
    if (!getalluser) {
      res.status(500).json({ success: false, message: "data not found " });
    }
  } catch (error) {
    res.status(404).json({ success: false, error: error.mesage });
  }
};
