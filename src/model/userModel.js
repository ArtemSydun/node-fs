const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        match: [/^380\d{7}$/, 'Please enter a valid phone number starting with 380']
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true
    },
}, { timestamps: true })


const User = mongoose.model('User', UserSchema);


module.exports = { User }
