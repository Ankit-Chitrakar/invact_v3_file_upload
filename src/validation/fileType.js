const path = require('path');
const fileTypeValidator = (file)=>{
    console.log(file);
    const allowedType = /jpeg|jpg|png|gif|/
    const validExt = allowedType.test(path.extname(file.originalname).toLowerCase());
    console.log(path.extname(file.originalname).toLowerCase())
    console.log(file.mimetype)
    const mimetype = allowedType.test(file.mimetype)
    return validExt && mimetype;

}

module.exports = {fileTypeValidator};