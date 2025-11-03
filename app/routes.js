const express = require("express");
const Note = require("./models/note");
const User = require("./models/user");
const router = express.Router();

//home
router.get("/", (req, res) => {
  res.render("index", { message: req.flash("loginMessage") });
});

//signup page
router.get("/signup", (req, res) => {
  res.render("signup", { message: req.flash("signupMessage") });
});

//dashboard: use google ai overview to debug
router.get("/notes", async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.redirect("/");
  const user = await User.findById(userId);
  const notes = await Note.find({ author: userId }).sort({ dateCreated: -1 });
  res.render("notes", { user, notes });
});

//create a note
router.post("/notes", async (req, res) => {
  const { title, content, noteId } = req.body;
  if (noteId) {
    await Note.findByIdAndUpdate(noteId, { title, content });
  } else {
    await Note.create({ title, content, author: req.session.userId });
  }
  res.redirect("/notes");
});

//delete note
router.delete("/notes", async (req, res) => {
  const { noteId } = req.body;
  await Note.findByIdAndDelete(noteId);
  res.json({ success: true });
});

module.exports = router;
