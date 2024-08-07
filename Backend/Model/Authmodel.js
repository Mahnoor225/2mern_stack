import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
      },
      isAdmin: {
        type: Boolean,
        default: false
    },
    profilepic: {
        type: String,
    }
}, {timesStamps:true});

const userModel = mongoose.model("user",userSchema)

export default userModel