import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. check all fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 2. email already exists?
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already used" });
    }

    // 3. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.json({ message: "User registered successfully", userId: user._id });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    // 2. compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    // 3. create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login success", token });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
