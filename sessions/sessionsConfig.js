const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const sessionOptions = {
  name: "sessions",
  secret: "akjoeinbjhklzsjfioeekl,fnsjs",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secret: false
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
  store: new knexSessionStore({
    knex: require("../data/knexConfig.js"),
    tablename: "sessions",
    sidfieldname: "sid",
    createTable: true,
    clearInterval: 1000 * 60 * 60
  })
};

module.exports = session(sessionOptions);
