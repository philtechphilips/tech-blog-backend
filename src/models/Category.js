const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: ['The Category Name is Required!', true],
        unique: true
    }
}, {timestamps: true})


module.exports = mongoose.model("Category", categorySchema)