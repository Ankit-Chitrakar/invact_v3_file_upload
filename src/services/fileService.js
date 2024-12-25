const fs = require('fs');
const { uploadToCloudinary } = require('../config/cloudinary');

const cloudinaryUpload = async (file)=>{
    try {
        const cloudinaryResponse = await uploadToCloudinary(file.path);
        fs.unlink(file.path, (err)=>{
            if(err){
                console.error(`Error deleting file ${file.path}: ${err}`);
                return;
            }
        })
        return cloudinaryResponse;
    }
    catch (error) {
        console.error(`Error uploading file to Cloudinary: ${error}`);
        throw error;
    }
}

module.exports = cloudinaryUpload;