const db = require("../knexConfig.js");

module.exports = {
  add_user,
  single_user,
  all_users
};

function add_user(user) {
  return db("users").insert(user);
}

function single_user(name) {
  return db("users")
    .where("use_name", name)
    .first();
}

function all_users() {
  return db("users");
}
