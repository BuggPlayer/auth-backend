const express = require("express");

const {
  userRegister,
  loginUser,
  getAllUser,
} = require("../Controller/Controllerdata");

const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(loginUser);
router.route("/").get(getAllUser);

module.exports = router;
