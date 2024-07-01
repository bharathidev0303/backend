
const mongoose = require('mongoose');
// Access environment variables
const PORT = process.env.PORT;
const dbUrl = process.env.DATABASE_URL;
const secretKey = process.env.SECRET_KEY;

mongoose.connect(dbUrl)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

  