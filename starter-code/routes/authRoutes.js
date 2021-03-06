const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const saltRounds = 10;
const router = express.Router();
const passport = require("passport");
const {isLoggedIn}= require("../middlewares/isLogged")

router.get("/login", (req, res, next) => {
  console.log(req.user);
  res.render("login");
});

router.get("/users",isLoggedIn("/"), (req, res, next) => {
  if (req.user) {
    User.find().then(users => res.render("allusers", { users }));
  } else {
    res.redirect("/");
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    badRequestMessage: "authError",
    failureFlash: true,
    passReqToCallback: true
  }),
  (req, res) => {
    if (req.session.returnTo) {
      return res.redirect(req.session.returnTo)
    }
    res.redirect("/");
  }
);

module.exports = router;
