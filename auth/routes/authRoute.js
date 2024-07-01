const express = require('express');
const router = express.Router();
const authController  = require("../controllers/authController");


//Regsiter New User
router.post('/register', authController.register);

module.exports = router;