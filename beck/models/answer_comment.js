import mongoose from 'mongoose'


const comment_ansSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true
  },
    postId: {
      type: String,
      required: true
    },
    commentId: {
      type: String,
      required: true
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
    imageUrl: String,
    },
  {
    timestamps: true
  }
)

export default mongoose.model('Comment_Ans', comment_ansSchema)