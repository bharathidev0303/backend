const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const sendEmail = require('../../utils/sendEmail.js');
const userService = require('../Services/userServices.js');


//Create a new user
exports.register = async (req, res) => {

    const { firstName, lastName, email, password, mobileNumber, role, gender, dateOfBirth, termsAndCondition } = req.body;


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    
    try {

        //Validation for existing email
       
        let user= await userService.getuserBycondition({ $or: [{ email }, { mobileNumber }] });
        
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        //Create a new user 
        user = new User({ firstName, lastName, email, password, mobileNumber, role, gender, dateOfBirth, termsAndCondition });


        //hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(200).json({ user, msg: 'User Registered successf ully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

//User Login form
exports.login = async (req, res) => {

    const { username, password } = req.body;
    try {
        //validate the data is not null
        if (!username || !password) {
            return badRequestError(res, 'Please provide both username and password');
        }

        //check if user exists 
        const user = await userService.getuserBycondition({ $or: [{ email: username }, { mobileNumber: username }] });
        if (!user) {
            return badRequestError(res, 'Invalid username');
        }

        //check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return badRequestError(res, 'Invalid password');
        }

        const payload = { userId: user._id, username: user.firstName };

        //create a json web token for authentication
        var token = await userService.createToken(payload);
        const refreshToken = await userService.createRefreshToken(payload);

        res.status(200).json({ token, refreshToken, message: 'Login Successful' });

    } catch (err) {
        return res.status(500).json({ message: 'Server Error', err });
    }




};

//Update User Details by ID

exports.updateUser = async (req, res) => {
    const { firstName, lastName, mobileNumber, dateOfBirth } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // console.log(" req.params.id",  req.userId)
        const user = await userService.getuserBycondition({ _id: req.userId }, '-password -gender -role -email -termsAndCondition');
       
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Define an object with fields that can be updated
        const fieldsToUpdate = { firstName, lastName, mobileNumber, dateOfBirth };

        // Update fields only if they are present in the request body
        for (let key in fieldsToUpdate) {
            if (fieldsToUpdate[key] !== undefined) {
                user[key] = fieldsToUpdate[key];
            }
        }

        await user.save();
        res.json({ msg: 'User updated successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


//Get user details by ID

exports.getUserById = async (req, res) => {
    try {
        let user = await userService.getuserBycondition({_id:req.userId },'firstName lastName mobileNumber dateOfBirth');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
      console.log(user);
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

//forgot password
exports.forgotPassword = async (req, res) => {

    const email = req.body.email

    if (!email) {
        return badRequestError(res, 'Please provide email');
    }

    try {
        let user = await userService.getuserBycondition({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });

        }

        //generate a random token
        const payload = { userId: user._id, username: user.firstName };
        var token = await userService.createToken(payload);

        //send email with token
        const resetUrl = `${process.env.CLIENT_URL}/resetPassword/${token}`;
        await sendEmail(user.email, 'Forgot Password', `Click on the link to reset your password: ${resetUrl}`);
        res.status(200).json({ message: 'Reset password link sent to your email' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

exports.resetPassword = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { newPassword } = req.body;

    try {

        let userId = req.userId;

        //get user by id
        const user = await userService.getuserByID(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();
        res.status(200).json({ message: "Password Reset" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }



};