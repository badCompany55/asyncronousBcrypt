const hashPassed = require("../bcrypt/bcrypt.js");
const session = require("../sessions/sessionsConfig.js");
const bcrypt = require("bcryptjs");
const db = require("../data/actions/user_actions.js");

const loginCheck = hashPassed.loginCheck;

module.exports = {
  loginAccess,
  restrictedAccess
};

async function loginAccess(req, res, next) {
  const { use_name, pass_word } = req.body;
  try {
    const theUser = await db.single_user(use_name);
    if (theUser && (await loginCheck(pass_word, theUser.pass_word)) == true) {
      req.session.user = theUser;
      next();
    } else {
      res.status(401).json({ Error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

async function restrictedAccess(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(400).json({ Error: "You are not authorized to access this." });
  }
}
