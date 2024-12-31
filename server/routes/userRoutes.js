import express from 'express';
import multer from 'multer';
import { registerUser, getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Configure Multer for file upload
const storage = multer.memoryStorage(); // Use memory storage for in-memory file handling
const upload = multer({ storage });

// Register user route with file upload
router.post('/register', upload.single('profilePicture') , registerUser);

// Other routes remain the same
router.get('/users', getAllUsers);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;
