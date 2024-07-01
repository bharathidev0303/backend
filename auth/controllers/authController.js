const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    const { name, email, password, mobileNumber } = req.body;


    // Validate required fields
    if (!name || !email || !password || !mobileNumber) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        // Initialize an object to collect errors
        let errors = {};

        // Check if the email already exists
        let user = await User.findOne({ email });
        console.log(user);
        if (user) {
            errors.email = "Email already exists";
        }

        // Check if the mobile number already exists
        let num = await User.findOne({ mobileNumber });
        if (num) {
            errors.mobileNumber = "Mobile number already exists";
        }

        if (Object.keys(errors).length > 0) {

            return res.status(400).json({ msg: errors });
        }
        else {
            // Create a new user
            user = new User({ name, email, password, mobileNumber });

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // Save the user to the database
            await user.save();

            // Return success response
            res.status(200).json({ user, msg: 'User Registered successfully' });
        }


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error', err });
    }
};


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
