const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
const connectDB = require('./connection/db');
const dotenv = require('dotenv');
const PORT = process.env.PORT;
require('./globalFunctions/globalfunctions.js');
const user = require('./auth/routes/auth.js');
const cors = require('cors');
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With'
}));
// Load environment variables from .env file
require('dotenv').config();



app.get('/', (req, res) => {
  res.send('Hello, world!');
});

//App run
app.get('/health', async (req, res) => {
  res.send('App is running...');
});
  
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.use('/api/user', user);