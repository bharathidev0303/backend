const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidationRules } = require ('../../validator/userValidator');
const { updateValidationRules} = require('../../validator/userValidator');

router.get('/', function (request, res, next) {
    res.json({
        status: 'success',
        message: 'NodeJs API',
        data: { version_number: 'v1.0.0' }
    });
});

//Regsiter, login, update and Getdetails
router.post('/register', registerValidationRules(), authController.register);
router.post('/login', authController.login);
router.put('/updateUser/:id', updateValidationRules(), authController.updateUser);
router.get('/getUserById/:id', authController.getUserById);


module.exports = router;