const { Router } = require("express");
const { upload } = require("../middleware/fileUpload");
const { fileController } = require("../controller/fileController");
const multer = require("multer");
const { UNEXPECTED_FILE_TYPE } = require("../constants/file");
const { imageResize } = require("../middleware/imageResize");
const { authenticateJWT } = require("../middleware/authentication");


const router = Router();

// File upload route
router.post("/upload", authenticateJWT, (req, res, next) => {
    console.log("hello world")
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === UNEXPECTED_FILE_TYPE.code) {
                return res.status(400).json({ error: { description: err.message } });
            }
        } else if (err) {
            return res.status(500).json({ error: { description: err.message } });
        }
        next();
    });
}, fileController, imageResize);

module.exports = router;
