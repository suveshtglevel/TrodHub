import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
    },

    otp: {
        type: String
    },

    otp_expiry: {
        type: Date
    },

    verified: {
        type: Boolean,
        default: false
    },
    
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    }

}, {
    timestamps: true
})

export default mongoose.model("User", userSchema)