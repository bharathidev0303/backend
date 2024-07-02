const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { to } = require('await-to-js');

exports.getuserBycondition = async (condition) => {
    const [error, userdata] = await to(
        User.findOne(condition)
    );
    if (error) {
        throw new Error(error.message);
    } else {
        return userdata;
    }
};
exports.createToken = async (payload) => {
    try {
        console.log("token_life",process.env.TOKEN_LIFE); 
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_LIFE });
        console.log(token);
        return token;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};
exports.createRefreshToken = async (payload) => {
    try {
        const token = jwt.sign(payload, process.env.refreshTokenSecret, { expiresIn: process.env.refreshTokenLife });
        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};
