const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },

       email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    gender : {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    dateOfBirth : {
        type: Date,
        required: true
    },

    termsAndCondition : {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model('User', UserSchema);