const express = require("express");
const db = require("../data/actions/user_actions.js");
const session = require("../sessions/sessionsConfig.js");
const bcrypt = require("bcryptjs");
const hashedPass = require("../bcrypt/bcrypt.js");
const access = require("../middleware/restricted.js");

const router = express.Router();
const theHash = hashedPass.theHash;

router.use(session);

router.post("/register", async (req, res) => {
  const creds = req.body;
  if (creds.use_name && creds.pass_word) {
    const newHash = await theHash(creds.pass_word, 10);
    creds.pass_word = newHash;
    try {
      const new_user = await db.add_user(creds);
      res.status(201).json(new_user);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(400).json({ Error: "The name and password are required" });
  }
});

router.post("/login", access.loginAccess, async (req, res) => {
  res.status(200).json({ Message: "Logged In" });
});

router.get("/users", access.restrictedAccess, async (req, res) => {
  try {
    const users = await db.all_users();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({ Error: "Unable to log out" });
    } else {
      res.status(200).json({ Message: "You have successfully logged out" });
    }
  });
});

module.exports = router;
