const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Create a new user
const register = async (req, res)=> {
    let  {name, email, password, mobileNumber } = req.body;

    // return res.json({name: name, email: email, password: password, mobileNumber});
    //validation for required fields

    if(!name || !email || !password || !mobileNumber){
        return res.status(400).json({msg: 'All fields are required'});
    } 
    try {

     //Validation for existing email
    let user = await User.findOne({email});
    var err= {};
    if(user){
        err.email ="Email already exists";
    }

    //validation for mobileNumber 
    let num = await User.findOne({mobileNumber});
    if(num){
        err.mobile ="Mobile already exists";
    }

    if(err){
        return res.status(400).json({msg: err});
    }
    
    //Create a new user 
    user = new User({name, email, password, mobileNumber});


    //hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(200).json({user, msg: 'User Registered successfully'});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};


const login = async (req, res) => {

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

module.exports = {register, login};
