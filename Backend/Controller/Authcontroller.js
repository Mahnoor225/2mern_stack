
import User from "../Model/Authmodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../Model/Authmodel.js";
import mongoose from "mongoose";

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
      isAdmin: false,
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
      console.log('Received email and password:', email, password);

      if (!email || !password) {
          return res.status(400).json({
              status: 400,
              message: "All fields are required",
          });
      }

      const userLogin = await User.findOne({ email });
      console.log('Found user:', userLogin);

      if (!userLogin) {
          return res.status(400).json({
              status: 400,
              message: "User not registered",
          });
      }

      const isMatch = await bcrypt.compare(password, userLogin.password);
      console.log('Password match:', isMatch);

      if (!isMatch) {
          return res.status(400).json({
              status: 400,
              message: "Password does not match",
          });
      }

      const tokenData = {
          _id: userLogin._id,
          email: userLogin.email,
      };
      const token = jwt.sign(tokenData, process.env.secretKey, { expiresIn: '8h' });
      console.log('Generated token:', token);

      const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 8 * 60 * 60 * 1000,
      };

      res.cookie('token', token, cookieOptions).status(200).json({
          message: "Login successfully",
          data: token,
          profilepic: userLogin.profilepic,
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




export const userlogout = (req, res) => {
  try {
    // Clear the cookie with the specified path
    res.clearCookie("token", { path: '/' });

    res.json({
      message: "Logged out successfully",
      error: false,
      success: true,
      data: []
    });
  } catch (error) {
    console.error('Logout Error:', error); // Log the error for internal debugging
    
    res.status(500).json({
      message: "An internal error occurred. Please try again later.",
      error: true,
      success: false,
      data: []
    });
  }
};


export const allUsers = async (req, res) => {
  try {
    // Logging userId for debugging
    console.log("User ID for all Users:", req.userId);

    // Check if req.userId is not crucial
    // You might want to remove this check if it's not required
    if (!req.userId) {
      console.warn("User ID is missing, but it's not required for this endpoint.");
    }

    const allUsers = await userModel.find();
    
    res.json({
      message: "All Users",
      data: allUsers,
      success: true,
      error: false
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(400).json({
      message: err.message || 'An error occurred',
      error: true,
      success: false
    });
  }
};


export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  // Validate ID (example for MongoDB ObjectId)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });
  }

  try {
    // Use { new: true } to return the updated document
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User data has been updated",
      updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error); // Logging error details for debugging
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
};









