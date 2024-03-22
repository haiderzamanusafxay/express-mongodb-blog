const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const register_controller = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const email_found = await User.findOne({ email });
    if (email_found) {
      return res.status(400).json({ data: {}, error: "Email already exists" });
    }
    const username_found = await User.findOne({ username });
    if (username_found) {
      return res
        .status(400)
        .json({ data: {}, error: "Username already exists" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const create_user = await User.create({
      username,
      email,
      password: hashed,
    });
    return res.status(201).json({
      data: {
        create_user: create_user,
        message: "User created successfully",
      },
      error: null,
    });
  } catch (error) {
    return res.status(500).json({ data: {}, error: error });
  }
};

const login_controller = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user_found = await User.findOne({ email });
    if (!user_found) {
      return res
        .status(400)
        .json({ data: {}, error: "Email or password is incorrect" });
    }
    const isMatch = await bcrypt.compare(password, user_found.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ data: {}, error: "Email or password is incorrect" });
    }
    return res
      .status(200)
      .json({
        data: { user_found: user_found, data: "Logged in successfully" },
        error: null,
      });
  } catch (error) {
    return res.status(500).json({ data: {}, error: error });
  }
};
module.exports = { register_controller, login_controller };
