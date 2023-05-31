const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    username: {
        type: String,
        required: ['Username is required!', true]
    },
    comment: {
        type: String,
        required: ['Comment is required!', true]
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)