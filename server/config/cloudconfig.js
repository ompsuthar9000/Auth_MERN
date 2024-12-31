// fileUpload.js
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET,
});

/**
 * Upload file to Cloudinary
 * @param {Buffer} fileBuffer - File buffer from Multer
 * @param {string} folder - Cloudinary folder name
 * @param {string} publicId - Public ID for the file
 * @returns {Promise<Object>} - Cloudinary upload result
 */
export const uploadFileToCloudinary = (fileBuffer, folder, publicId) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder, public_id: publicId },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );

        uploadStream.end(fileBuffer); // Pass the file buffer to the stream
    });
};
