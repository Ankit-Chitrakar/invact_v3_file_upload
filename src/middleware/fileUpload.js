const multer = require("multer");
const { fileTypeValidator } = require("../validation/fileType");
const { UNEXPECTED_FILE_TYPE } = require("../constants/file");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const isFileTypeAllowed = fileTypeValidator(file);
        if (isFileTypeAllowed) {
            cb(null, true);
        } else {
            cb(new multer.MulterError(UNEXPECTED_FILE_TYPE.code, UNEXPECTED_FILE_TYPE.message));
        }
    },
}).array("file", 1);

module.exports = { upload };
