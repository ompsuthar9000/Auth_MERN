import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Uncomment this to use fs.promises

const uploadImage = async (filepath) => {
    try {
        // Configure Cloudinary
        cloudinary.config({
            cloud_name: process.env.CLOUDNAME,
            api_key: process.env.APIKEY,
            api_secret: process.env.APISECRET,
        });

        if (!filepath) {
            throw new Error("Filepath is not provided.");
        }

        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(filepath, {
            folder: "/tmp", // Optional: Save in a folder
        });

        // Get the uploaded file URL
        const profilePicUrl = result.secure_url;

        // Delete the local file after upload
        await fs.unlink(filepath);

        return profilePicUrl;
    } catch (error) {
        console.error("Error uploading image:", error.message);
        throw error; // Re-throw the error for the caller to handle
    }
};

export default uploadImage;
