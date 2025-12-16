// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    // const { name, email, password, profileImage } = req.body;
    const { name, email, password } = req.body;
const profileImage = req.file ? `/uploads/${req.file.filename}` : null;


    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const normEmail = String(email).trim().toLowerCase();

    const existing = await User.findOne({ email: normEmail });
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//   name: name.trim(),
//   email: normEmail,
//   password: hashedPassword,
//   profileImage // ✅ base64 stored
// });

const user = await User.create({
  name: name.trim(),
  email: normEmail,
  password: hashedPassword,
  profileImage
});

  
    // create token after signup
const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

return res.status(201).json({
  message: "User registered successfully",
  token
});


  } catch (err) {
    console.error("registerUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normEmail = String(email).trim().toLowerCase();

    const user = await User.findOne({ email: normEmail });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,                 // create token with user id
      { expiresIn: "1h" }
    );

    // return res.json({ message: "Login success", token });
    return res.json({message: "Login success",token,profileImage: user.profileImage || null});

  } catch (err) {
    console.error("loginUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
