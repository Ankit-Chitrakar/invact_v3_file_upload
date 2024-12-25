const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const crypto = require('crypto');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Generate Signature for Upload
const generateSignature = (paramsToSign) => {
    const { api_secret } = cloudinary.config();
    const sortedParams = Object.keys(paramsToSign)
        .sort()
        .map((key) => `${key}=${paramsToSign[key]}`)
        .join("&");

    const signature = crypto.createHash('sha1').update(sortedParams + api_secret).digest("hex");
    return signature;
};

// Upload File to Cloudinary
const uploadToCloudinary = async (filePath) => {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const paramsToSign = { timestamp };

        const result = await cloudinary.uploader.upload(filePath, {
            ...paramsToSign,
            signature: generateSignature(paramsToSign),
            api_key: process.env.CLOUDINARY_API_KEY,
        });

        return result;
    } catch (err) {
        console.error("Error uploading file to Cloudinary:", err);
        throw err;
    }
};

module.exports = { uploadToCloudinary };
