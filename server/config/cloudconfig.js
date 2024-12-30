import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs/promises';
const uploadImage = async (filepath) => {
    cloudinary.config(
        {
            cloud_name: process.env.CLOUDNAME,
            api_key: process.env.APIKEY,
            api_secret: process.env.APISECRET
        })

    // Check if file was uploaded
    let profilePicUrl = '';
    if (filepath) {
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(filepath, {
            folder: 'tmp/uploads', // Optional: Save in a folder
        });
        profilePicUrl = result.secure_url;

        // Delete the local file after upload
        await fs.unlink(filepath);
        return profilePicUrl;
    }
}

export default uploadImage