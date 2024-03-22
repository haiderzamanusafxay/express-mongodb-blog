const Router = require("express").Router();
const {
  register_controller,
  login_controller,
} = require("../controllers/auth.controller.js");

Router.post("/register", register_controller);
Router.post("/login", login_controller);

module.exports = Router;
