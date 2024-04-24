import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER USER
// POST "/api/users/register"
// ACCESS PRIVATE
export const registerUser = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please provide all fields" });
  }
  try {
    // CHECKING IF USER ALREADY EXISTS
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE A NEW USER
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// USER LOGIN
// POST "/api/users/login"
// ACCESS PRIVATE
export const loginUser = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please provide all fields" });
  }

  try {
    const user = await User.findOne({ email });

    // VERIFYING PASSWORD
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Server error" });
  }
});
// CURRENT USER INFO
// GET "/api/users/current"
// ACCESS PRIVATE
export const currentUser = expressAsyncHandler((req, res, next) => {
  res.json(req.user);
});
