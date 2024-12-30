import multer from "multer";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./tmp"); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix); // Unique file name
    }
});

// File filter for validation (e.g., only images)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true); // Accept file
    } else {
        cb(new Error("Only image files are allowed!"), false); // Reject file
    }
};

export const upload = multer({ storage, fileFilter });
