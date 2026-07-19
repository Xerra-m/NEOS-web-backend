// dependencies
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { Auth } from "../models/authModel.js";

// hash strength
const SALT_ROUNDS = 10;

// auth handler
export const register = async (req, res) => {
  try {
    // get username and password
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await Auth.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "username sudah terdaftar!" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // save new user
    await Auth.create({ username, password: hashedPassword });

    res.status(201).json({ message: "User berhasil didaftarkan!" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    // get username and password
    const { username, password } = req.body;

    // find username in database
    const user = await Auth.findByUsername(username);

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    // password match check
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Password salah!" });
    }

    // sign token to user
    if (!process.env.JWT_TOKEN) {
      throw new Error("JWT TOKEN di .env ga ada!");
    }
    const token = jwt.sign({ username: user.username }, process.env.JWT_TOKEN, {
      expiresIn: "24h",
    });

    // status
    res.status(200).json({ message: "Login berhasil!", token });
  } catch (err) {
    //status
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
