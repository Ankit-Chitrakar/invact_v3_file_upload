// const fileController = (req, res) => {
//     return res.status(200).json({ message: "File uploaded successfully" });
// };

const cloudinaryUpload = require("../services/fileService");

// module.exports = { fileController };


const fileController = async(req, res)=>{
    try{
        if(!req.files){
            return res.status(400).json({error: {description: 'File not present in the request body.'} })
        }
        
        if(Array.isArray(req.files) && req.files.length == 0){
            return res.status(400).json({error: {description: 'No files uploaded'} })
        }

        const file = req.files[0];
        const response = await cloudinaryUpload(file);
    
        return res.status(200).json({message: 'File uploaded successfully', uploadedFile: response});
    }catch(err){
        return res.status(500).json({error: {description:  err.message}})
    }  
}

module.exports = {fileController};