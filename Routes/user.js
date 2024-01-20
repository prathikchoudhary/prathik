const express = require("express");
const router = express.Router();
const user = require("../model/user.js");
const wrapacsy = require("../utils/wrapacsy.js");
const passport = require("passport");
const { saveRedirect } = require("../middelWare.js");
const userController = require("../controllers/user.js");

router.route("/signup")
.get((userController.renderSignup))
.post(wrapacsy(userController.singUp))

router.route("/login")
.get((userController.renderLogin))
.post(saveRedirect, passport.authenticate("local",{failureRedirect: "/login",failureFlash: true}),(userController.login))

router.get("/logout",(userController.logout));

module.exports = router;