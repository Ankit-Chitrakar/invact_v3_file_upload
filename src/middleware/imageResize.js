const sharp = require('sharp');
const path = require('path')

const imageResize = async (req, res, next)=>{
    try{
        const originalFilePath = req.files[0].path;
        const parsedPath = path.parse(originalFilePath)

        const outputFilePath = path.join(parsedPath.dir, "resized-"+parsedPath.name+".jpeg");
        await sharp(originalFilePath).resize({width: 1500}).jpeg({
            quality: 100,
            mozjpeg: true,
            chromaSubsampling: "4:4:4",
            trellisQuantisation: true,
            overshootDeringing: true,
            overshootDeringing: true,
            optimiseScans: true,
            progressive: true,
        }).toFile(outputFilePath);

        req.files[0].path = outputFilePath;
        req.originalFilePath = originalFilePath;
        next();
    }catch(err){
        return res.status(500).json({error: {description: err.message}});
    }
}

module.exports = {imageResize};