import User from '../schema/UserSchema.js';
import bcrypt from 'bcryptjs';
import uploadImage from '../config/cloudconfig.js';
import path from 'path';
import fs from 'fs';

// Define the directory for storing uploaded images
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Validate if a file was uploaded
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'Profile picture is required' });
    }

    // Move the file to the uploads directory with a unique name
    const ext = path.extname(req.file.originalname);
    const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${ext}`;
    const newFilePath = path.join(UPLOADS_DIR, uniqueFilename);

    fs.renameSync(req.file.path, newFilePath);

    // Use a relative path to store the image
    const relativeFilePath = path.relative(process.cwd(), newFilePath);

    const hash = await bcrypt.hash(password, 10);

    const payload = {
      name: name,
      email: email,
      mobile: Number(mobile),
      profilePicture: relativeFilePath, // Save the relative path in the database
      password: hash,
    };
    const newUser = await User.create(payload);

    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user data
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { mobile, email, name } = req.body; // Extract all fields from the body to be updated
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { mobile, email, name },
      { new: true } // `new: true` returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
