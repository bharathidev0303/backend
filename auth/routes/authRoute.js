const express = require('express');
const router = express.Router();
const authController  = require("../controllers/authController");


router.post('/register', authController.register); //Regsiter New User
router.put('/updateUser/:id', authController.updateUser); //update details existing user by id
router.get('/getUserById/:id', authController.getUserById); //get user details by id

module.exports = router;