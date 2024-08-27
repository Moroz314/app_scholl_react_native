import PostModel from '../models/post.js'

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()

        res.json(posts)
    }   
    catch (err){
        res.status(500).json({
            message: 'неудалось сополучить статьи'
        });
        console.log(err)
   }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.findOneAndUpdate({ _id: postId }, {
            $inc: {viewsCount: 1},
        },
        {
            returnDocument: 'after'
        }
    ).populate('user').exec()
    res.json(post)
    }   
    catch (err){
        res.status(500).json({
            message: 'неудалось сополучить статью'
        });
        console.log(err)
   }
}
export const create = async (req, res) => {
    try{
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            image: req.body.image,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post)
    }
    catch (err){
        res.status(500).json({
            message: 'неудалось создать статью'
        });
        console.log(err)
   }
}
export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.findByIdAndDelete({_id: postId}
    )
    res.json({
        sucses: true
    })
    }   
    catch (err){
        res.status(500).json({
            message: 'неудалось сополучить статью'
        });
        console.log(err)
   }
}
export const like_plus = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.updateOne( {
            _id: postId
        },{$inc: {like: 1}})
        res.json({
            sucses: true
        })
      }  catch (err){
            res.status(500).json({
                message: 'неудалось обнвить статью'
            });
            console.log(err)
       }
}
export const like_minus = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.updateOne( {
            _id: postId
        },{$inc: {like: -1}})
        res.json({
            sucses: true
        })
      }  catch (err){
            res.status(500).json({
                message: 'неудалось обнвить статью'
            });
            console.log(err)
       }
}
export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.updateOne(
            {
                _id: postId
            },
            {
                title: req.body.title,
                text: req.body.text,
                image: req.body.image,
                tags: req.body.tags,
                user: req.userId,
            }
        )
        res.json({
            sucses: true
        })
      }  catch (err){
            res.status(500).json({
                message: 'неудалось обнвить статью'
            });
            console.log(err)
       }
}
export const getPosts = async (req, res) => {
    try {
        const tag = [
            req.body.drugoe,
            req.body.technology,
            req.body.izo,
            req.body.music,
            req.body.history_SPB,
            req.body.english,
            req.body.physical_culture,
            req.body.biology,
            req.body.chemistry,
            req.body.geography,
            req.body.history,
            req.body.informatics,
            req.body.literature,
            req.body.obg,
            req.body.physics,
            req.body.russian,
            req.body.mathematics
        ].filter(Boolean);
        
        if (tag.length === 0) {
            return res.status(400).json({ message: 'No tags provided' });
        }
        const posts = await PostModel.find({ tags: { $in: tag } }).sort({ createdAt: -1 }).populate('user').exec();

        res.json(posts)
    }   
    catch (err){
        res.status(500).json({
            message: 'неудалось сопоawfить статьи'
        });
        console.log(err)
   }
}