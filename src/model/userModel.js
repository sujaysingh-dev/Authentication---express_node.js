const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username : {
            type: String,
            require: true,
            unique: true,
        }, 
        password : {
            type: String,
            require: true
        },
        role : {
            type: String,
            require: true,
            enum: ['admin','user','teacher','student'],
        },
    },
    {
        timestamps: true,
    }    
);

module.exports = mongoose.model('User', userSchema)