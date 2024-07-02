const jwt = require('jsonwebtoken');
const User = require('../models/user');




const jwtSecret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    console.log("Token",token);
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    token = token.split(' ')[1];
    jwt.verify(token, jwtSecret, async(err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }

        req.userId = decoded.userId;
        const userData =await User.findById(decoded.userId);
        console.log("userData",userData);
        if (!userData) {
            return res.status(401).json({ message: 'Unauthorized' });
        }



        next();
    });
};

module.exports = verifyToken;
