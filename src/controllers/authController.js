// dependencies
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// import database schema/model
import User from "../models/User.js";

// hash strength
const SALT_ROUNDS = 10;

// handler function for generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_TOKEN,
    { expiresIn: "1d" },
  );
};

export const register = async (req, res) => {
  try {
    // get username, email, and password from request
    const { username, email, password } = req.body;

    // check email exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "Error",
        message: "The email is already registered; please use another email.",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    return res.status(201).json({
      status: "Success",
      message: "Registration successful! Please log in.",
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(`Xerra Log - Error: ${err.message}`);
    return res.status(500).json({
      status: "Error",
      message: "500 A server error occurred.",
    });
  }
};

export const login = async (req, res) => {
  try {
    // get username, email, and password from request
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "Error",
        message: "Incorrect email or password!",
      });
    }

    // password validate
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: "Error",
        message: "Incorrect email or password!",
      });
    }

    // token validate
    const token = generateToken(user);

    // status
    res.status(200).json({
      status: "Success",
      message: "Login successful!",
      token,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(`Xerra log - Login error: ${err.message}`);
    return res.status(500).json({
      status: "Error",
      message: "500 A server error occurred",
    });
  }
};
