import mongoose from "mongoose";

const News_Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default: [],
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: false,
    },
    },
    {
        timestamps: true,
    }
);


export default mongoose.model('News', News_Schema)