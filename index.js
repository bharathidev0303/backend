require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
const connection = require('./connection/db.js')

//routes
const user=require('./Auth/routes/authRoute.js');

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.use('/api/user', user);
