const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: ['Name field is required!', true],
        unique: false
    }, email:{
        type: String,
        required: ['Email field is required!', true],
        unique: true
    },password:{
        type: String,
        required: ['Password field is required!', true],
    },role:{
        type: String,
        required: true,
        default: 'user'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],profilePic:{
        type: Buffer
    }
}, {timestamps: true})

userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token 
} 

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user){
        throw new Error('These credentials do not match our records.')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('These credentials do not match our records.')
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User