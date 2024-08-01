import { randomUUID } from "crypto";
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID()
    },
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 6
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    chats: [chatSchema]
})

const User = mongoose.model("User", userSchema);

export default User;