import NewsModel from '../models/news.js'

export const getAll = async (req, res) => {
    try {
        const news = await NewsModel.find().populate('user').exec()

        res.json(news)
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
        const newsId = req.params.id;
        const news = await NewsModel.findOneAndUpdate({ _id: newsId }, {
            $inc: {viewsCount: 1},
        },
        {
            returnDocument: 'after'
        }
    ).populate('user').exec()
    res.json(news)
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
        const doc = new NewsModel({
            title: req.body.title,
            text: req.body.text,
            image: req.body.image,
            tags: req.body.tags,
            user: req.userId,
        });

        const news = await doc.save();

        res.json(news)
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
        const newsId = req.params.id;
        const news = await NewsModel.findByIdAndDelete({_id: newsId}
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
export const update = async (req, res) => {
    try {
        const newsId = req.params.id;
        const news = await NewsModel.updateOne(
            {
                _id: newsId
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