const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./connection/db');
const dotenv = require ('dotenv');
const PORT = process.env.PORT;

const user=require('./auth/routes/authRoute.js');


// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

//App run
app.get('/health', async (req, res)=>{
    res.send('App is running...');
});




//Listen Port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user',user);