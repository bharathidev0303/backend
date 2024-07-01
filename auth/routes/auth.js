const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', function (request, res, next) {
    res.json({
        status: 'success',
        message: 'NodeJs API',
        data: { version_number: 'v1.0.0' }
    });
});

//Regsiter New User
router.post('/register', authController.register);
router.post('/login', authController.login);


module.exports = router;