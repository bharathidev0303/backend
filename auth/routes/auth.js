const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {updateValidationRules,registerValidationRules } = require('../../validator/userValidator');
const verifyToken = require('../../middleware/verifyToken');

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
router.put('/updateUser', verifyToken, updateValidationRules(), authController.updateUser);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/reset-password',verifyToken, authController.resetPassword);




module.exports = router;