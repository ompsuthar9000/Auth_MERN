import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { registerUser, getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer-Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'user_profiles', // Cloudinary folder name
        format: async (req, file) => 'png', // Convert to PNG
        public_id: (req, file) => Date.now() + '-' + file.originalname, // Unique public ID
    },
});


const upload = multer({ storage });

// Register user route with Multer middleware
router.post('/register', upload.single('profilePicture'), registerUser);

// Other routes remain the same
router.get('/users', getAllUsers);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;
