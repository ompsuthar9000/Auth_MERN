import User from '../schema/UserSchema.js';
import bcrypt from 'bcryptjs';
import uploadImage from '../config/cloudconfig.js';



export const registerUser = async (req, res) => {
  
  try {
    const { name, email, mobile, password } = req.body;
   
      
      // const filename = await uploadImage(path.join(process.cwd(),  req.file.path ))
    
      const hash = await bcrypt.hash(password, 10);

      const payload = {
        name: name,
        email: email,
        mobile: Number(mobile),
        profilePicture: req.file.path, // Save the public URL in the database
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
