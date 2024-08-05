
import User from "../Model/Authmodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";


// Registeruser 
export const Registeruser = async (req, res) => {
  try {
    const { name, email, password, confirmpassword, profilepic } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !confirmpassword) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 400,
        message: "User already exists",
      });
    }

    // Check if passwords match
    if (password !== confirmpassword) {
      return res.status(400).json({
        status: 400,
        message: "Passwords do not match",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilepic, // Save the image URL or path
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.secretKey, {
      expiresIn: "1h",
    });

    res.status(201).json({
      success: true,
      id: newUser._id,
      message: "User registered successfully",
      token,
      profilepic,
    });
  } catch (error) {
    console.error('Registration error:', error); // Log error for debugging
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};


export const Loginuser = async (req, res) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({
              status: 400,
              message: "All fields are required",
          });
      }

      // Find user by email
      const userLogin = await User.findOne({ email });
      if (!userLogin) {
          return res.status(400).json({
              status: 400,
              message: "User not registered",
          });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
          return res.status(400).json({
              status: 400,
              message: "Password does not match",
          });
      }

      // Generate JWT token
      const tokenData = {
          _id: userLogin._id,
          email: userLogin.email,
      };
      const token = jwt.sign(tokenData, process.env.secretKey, { expiresIn: '8h' });

      // Set token as HTTP-only cookie
      const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Only set secure flag in production
          maxAge: 8 * 60 * 60 * 1000, // 8 hours in milliseconds
      };

      res.cookie("token", token, cookieOptions).status(200).json({
          message: "Login successfully",
          data: token,
          profilepic: userLogin.profilepic, // Include the profilepic in the response
          success: true,
          error: false
      });
  } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
          status: 500,
          message: error.message,
      });
  }
};


