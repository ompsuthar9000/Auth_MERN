import express from 'express';
import multer from 'multer';
import { registerUser, getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'tmp/uploads'); // Temporary storage folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
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
