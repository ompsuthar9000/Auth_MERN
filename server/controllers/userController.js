import User from '../schema/UserSchema.js';
import bcrypt from 'bcryptjs';
import { uploadFileToCloudinary } from '../config/cloudconfig.js'; // Import the Cloudinary upload function

export const registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        // Validate required fields
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Hash the password
        const hash = await bcrypt.hash(password, 10);

        let profilePictureUrl = null;
        if (req.file) {
            // Upload file to Cloudinary
            const cloudinaryResult = await uploadFileToCloudinary(
                req.file.buffer, // File buffer from Multer
                'user_profiles', // Cloudinary folder
                Date.now() + '-' + req.file.originalname // Unique public ID
            );
            profilePictureUrl = cloudinaryResult.secure_url; // Get the secure URL
        }

        // Create the user payload
        const payload = {
            name,
            email,
            mobile: Number(mobile),
            profilePicture: profilePictureUrl, // Save the Cloudinary URL in the database
            password: hash,
        };

        // Save user in the database
        const newUser = await User.create(payload);

        res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (error) {
        console.error('Error during user registration:', error.message);
        res.status(500).json({ error: 'Internal server error' });
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
