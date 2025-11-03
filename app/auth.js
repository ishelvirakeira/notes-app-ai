//got help on this from housemates
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const router = express.Router();

//signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    req.flash("signupMessage", "Email already registered!");
    return res.redirect("/signup");
  }
  const hash = await bcrypt.hash(password, 10); //ref: https://www.digitalocean.com/community/tutorials/how-to-handle-passwords-safely-with-bcryptsjs-in-javascript#introduction
  await User.create({ name, email: email.toLowerCase(), password: hash });
  req.flash("loginMessage", "Signup successful. Please log in.");
  res.redirect("/");
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    req.flash("loginMessage", "Invalid credentials.");
    return res.redirect("/");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    req.flash("loginMessage", "Invalid credentials.");
    return res.redirect("/");
  }
  req.session.userId = user._id;
  res.redirect("/notes");
});

//logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

module.exports = router;