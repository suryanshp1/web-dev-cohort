import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: 2,
        maxLength: 50,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: true,
        lowercase:true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 8,
        select: false,
        // We know :)
    },
    role: {
        type: String,
        enum: ["customer", "seller", "admin"],
        default: "customer",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        select: false,
    },
    refreshToken: {
        type: String,
        select: false,
    },
    resetPasswordToken: {
        type: String,
        select: false,
    },
     resetPasswordExpires: {
        type: Date,
        select: false,
    },
}, {timestamps: true})

userSchema.pre('save', async function(next) {
    if (!this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password, 12)

    next()
})

export default mongoose.model("User", userSchema)