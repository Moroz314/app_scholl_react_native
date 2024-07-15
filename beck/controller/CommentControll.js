import CommentModel from '../models/comment.js'

export const create = async (req, res) => {
    try{
        const doc = new CommentModel({
            text: req.body.text,
            postId: req.body.postId,
            user: req.userId,
        });

        const comment = await doc.save();

        res.json(comment)
    }
    catch (err){
        res.status(500).json({
            message: 'неудалось создать комент'
        });
        console.log(err)
   }
}
export const getComments = async (req, res) => {
    try {
        const postId = req.params.post_id;
        const post = await CommentModel.find({ postId: postId }).populate('user').exec()
    res.json(post)
    }   
    catch (err){
        res.status(500).json({
            message: 'неудалось сополучить статью'
        });
        console.log(err)
   }
}