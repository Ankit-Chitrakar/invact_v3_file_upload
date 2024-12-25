const jwt = require('jsonwebtoken');
require('dotenv').config()

const authenticateJWT = (req, res, next)=> {
    const token = req.header("Authorization")?.split(' ')[1];
    console.log('Authentication token: ' + token);
    if(!token){
        return res.status(403).json({error: {message: "No token provided. Authorization denied"}});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({error: {description: err.message}})
    }
}

module.exports = {authenticateJWT};

