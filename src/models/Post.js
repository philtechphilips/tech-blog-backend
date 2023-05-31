const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: ['Title is required', true],
        unique: true
    }, description: {
        type: String,
        required: ['Description is required', true],
    },photo:{
        type: String,
        required: false
    },
    author: {
        type: String,
        required: true
    },categories:{
        type: String,
        required: false
    }
}, {timestamps: true})


module.exports = mongoose.model("Post", postSchema)