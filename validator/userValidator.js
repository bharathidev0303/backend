const { body } = require('express-validator');

exports.registerValidationRules = () => {
    return [
        body('firstName')
        .notEmpty()
        .withMessage('First Name is Required')
        .isString()
        .withMessage('First Name must be a string'),

        body('lastName')
        .notEmpty()
        .withMessage('Last Name is Required')
        .isString()
        .withMessage('Last Name must be string'),

        body('email')
        .notEmpty()
        .withMessage('Email is Required')
        .isEmail()
        .withMessage('Email must be a Valid email address'),

        body('password')
        .notEmpty()
        .withMessage('Password is Required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),

        body('mobileNumber')
        .notEmpty()
        .withMessage('Mobile Number is Required')
        .isLength({ min: 10, max: 10 })
        .withMessage('Mobile Number must be exactly 10 digits long')
        .isNumeric()
        .withMessage('Mobile Number must contain only numbers'),

        body('role')
        .notEmpty()
        .withMessage('Role is Required'),
    
        
        body('gender')
        .notEmpty()
        .withMessage('Gender is Required'),

        body('dateOfBirth')
        .notEmpty()
        .withMessage('Date of Birth is Required')
        .isDate()
        .withMessage('Date of Birth must be a valid date'),

        body('termsAndCondition')
        .notEmpty()
        .withMessage('Terms and Conditions must be agreed')
        .isBoolean()
        .withMessage('Terms and Conditions must be a boolean'),
    
    ];
}


//Login Validations
exports.loginValidationRules = () => {
    return [
        body('email')
        .notEmpty()
        .withMessage('Email is Required')
        .isEmail()
        .withMessage('Email must be a Valid email address'),

        body('mobileNumber')
        .notEmpty()
        .withMessage('Mobile Number is Required')
        .isLength({ min: 10, max: 10 })
        .withMessage('Mobile Number must be exactly 10 digits long')
        .isNumeric()
        .withMessage('Mobile Number must contain only numbers'),

        body('password')
        .notEmpty()
        .withMessage('Password is Required')
       .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        

    ];
}


//Update Validation
exports.updateValidationRules = () => {
    return [
        body('firstName')
        .optional()
        .notEmpty()
        .withMessage('First Name is Optional')
       .isString()
       .withMessage('First Name must be a string'), 

        body('lastName')
        .optional()
        .notEmpty()
        .withMessage('Last Name is Optional')
       .isString()
       .withMessage('Last Name must be a string'),

        body('email')
        .optional()
        .notEmpty()
        .withMessage('Email is Optional')
       .isEmail()
       .withMessage('Email must be a Valid email address'),
        
        body('mobileNumber')
        .optional()
        .notEmpty()
        .withMessage('Mobile Number is Optional')
        .isLength({ min: 10, max: 10 })
        .withMessage('Mobile Number must be exactly 10 digits long')
        .isNumeric()
        .withMessage('Mobile Number must contain only numbers')
        .exists()
        .withMessage('Mobile Number must')
        .isMobilePhone()
        .withMessage('Mobile Number must be a valid phone number'),

        body('role')
        .optional()
        .notEmpty()
        .withMessage('Role is Optional'),
        

        body('gender')
        .optional()
        .notEmpty()
        .withMessage('Gender is Optional'),
        

        body('dateOfBirth')
        .optional()
        .notEmpty()
        .withMessage('Date of Birth is Optional')
        .isDate()
        .withMessage('Date of Birth must be a valid date'),
    ];
}