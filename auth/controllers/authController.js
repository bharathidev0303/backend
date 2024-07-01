const User = require('../../models/user');
const bcrypt = require('bcryptjs');


//Create a new user
const register = async (req, res)=> {
    let  {name, email, password, mobileNumber } = req.body;

    
    //validation for required fields

    if(!name || !email || !password || !mobileNumber){
        return res.status(400).json({msg: 'All fields are required'});
    } 
    try {
        //Validation for existing email
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({ msg: 'Email already exists' });
        }

        //validation for mobileNumber 
        let num = await User.findOne({mobileNumber});
        if(num){
            return res.status(400).json({ msg: 'Mobile Number already exists' });
        }

            //Create a new user 
            user = new User({name, email, password, mobileNumber});


             //hash the password
             const salt = await bcrypt.genSalt(10);
             user.password = await bcrypt.hash(password, salt);
 
             await user.save();
             return res.status(200).json({user, msg: 'User Registered successfully'});

    } catch(err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }

};



//Update user by ID
const updateUser = async (req, res) => {

    const { name, email, mobileNumber } = req.body;
    try {
        let user = await User.findById(req.params.id);

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //update user new details
        user.name = name;
        user.email = email;
        user.mobileNumber = mobileNumber;

        await user.save();

       return  res.json({message: 'User details updated successfully', user});
    } catch (err) {
        console.log(err);
       return res.status(500).json({ message: 'Server Error' });
    }
};


//Get user details by id

const getUserById = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        } 

        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { updateUser,register, getUserById };