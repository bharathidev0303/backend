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
        required: true,
        select:true
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
    gender: {
        type: String,
        required: true,
        //enum: ['Male', 'Female', 'Other']
    },
    dateOfBirth: {
        type: String,
        required: true
    },

    termsAndCondition: {
        type: Boolean,
        required: true,
        default: false,
        select:true
    }


},
    {
        timestamps: true,
        versionKey: false,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }


);

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model('User', UserSchema);