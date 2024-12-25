const express = require("express");
const path = require("path");
const fs = require("fs");
const fileRouter = require("./src/routes/fileRouter");
const cors = require("cors");

const app = express();

app.use(cors())

// Create the "uploads" directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the router for file upload routes
app.use("/files", fileRouter);

// Fallback route for invalid endpoints
app.use("/", (req, res) => {
    res.send("Welcome to the file upload server. Use /api/files/upload to upload files.");
});

// Start the server
const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
