const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    register: {
        type: Boolean
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    totallScore: {
        type: Number,
        default: 0
    },
    gameHistory: [
        {
            date: { type: Date, default: Date.now },
            score: Number,
        }],
    learningPreferences: {
        level: { type: String, default: 'beginner' },
        categories: [{ type: String }],
    }

})


module.exports = mongoose.model('User', userSchema)