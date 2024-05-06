import mongoose from "mongoose";

const User_Schema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    },
    {
        timestamps: true,
    }
);


export default mongoose.model('User', User_Schema)