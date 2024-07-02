const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

    //Create a new user
    exports.register = async (req, res)=> {

    const  {firstName, lastName, email, password, mobileNumber, role, gender, dateOfBirth, termsAndCondition } = req.body;

           
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

        const fileds={ firstName,
        lastName,
        email,
        password,
        mobileNumber,
        role,
        gender,
        dateOfBirth,
        termsAndCondition};

// return res.json(fileds);
    //validation for required fields

    // if(!firstName || lastName || !email || !password || !mobileNumber || !role || !gender || !dateOfBirth || !termsAndCondition){
    //     return res.status(400).json({msg: 'All fields are required'});
    // } 
    try {

     //Validation for existing email
    let user = await User.findOne({email});

    if(user){
        return res.status(400).json({ msg: 'User already exists' });
    }

    //validation for mobileNumber 
    let num = await User.findOne({mobileNumber});
    if(num){
        return res.status(400).json({ msg: 'Mobile Number already exists' });
    }
    
    //Create a new user 
    user = new User({firstName, lastName, email, password, mobileNumber, role, gender, dateOfBirth, termsAndCondition});


    //hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(200).json({user, msg: 'User Registered successf ully'});
    } catch(err) {
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
            return res.status(400).json({ message: 'Please provide both username and password' });
        }

        //check if user exists 
        const user = await User.findOne({ email: username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        //check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const jwtSecret = process.env.JWT_SECRET;

        //create a json web token for authentication
        const payload = { userId: user._id, username: user.username };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });

    } catch (err) {
        return res.status(500).json({ message: 'Server Error', err });
    }

};

//Update User Details by ID

exports.updateUser = async (req, res) => {


    const { firstName, lastName, email, mobileNumber, role, gender, dateOfBirth } = req.body;

    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // let user = await User.findById(req.params.id);
        console.log({Id:req.params.id});
        const user = await User.findOne({_id:req.params.id},'-password -termsAndCondition');
        // console.log("ddddd",user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

       // Update fields only if they are present in the request body
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (mobileNumber) user.mobileNumber = mobileNumber;
        if (role) user.role = role;
        if (gender) user.gender = gender;
        if (dateOfBirth) user.dateOfBirth = dateOfBirth;
            // user.firstName = firstName;
            //  user.lastName = lastName;
            //  user.email = email;
            // user.mobileNumber = mobileNumber;
            // user.role = role;
            // user.gender = gender;
            // user.dateOfBirth = dateOfBirth;

          await user.save();

        //let updatedUser = {firstName, lastName, email, mobileNumber, role, gender, dateOfBirth};

        res.json({ msg: 'User updated successfully', user });


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


//Get user details by ID

exports.getUserById = async (req, res) => {
    try {
        let user = await User.findOne({_id:req.params.id},  '-password -termsAndCondition');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};