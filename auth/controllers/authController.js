const User = require('../../models/user');
const bcrypt = require('bcryptjs');


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

module.exports = {register};