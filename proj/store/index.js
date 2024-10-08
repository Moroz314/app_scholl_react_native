import {configureStore} from "@reduxjs/toolkit";
import { authReduser } from "../slices/auth";
import { usersReduser } from "../slices/users";
import { PostsReduser } from "../slices/post";
import { PostReduser } from "../slices/post_list";
import { CommentReduser } from "../slices/comment";
import { CommentCreaReduser } from "../slices/creat_comment";
import { CommentAnsReduser } from "../slices/comment_ans";
import { NewsReduser } from "../slices/news";
import { NewReduser } from "../slices/news_list.js";

export default configureStore({
    reducer: {
        auth: authReduser,
        users: usersReduser,
        posts: PostsReduser,
        post: PostReduser,
        comment: CommentReduser,
        creatCom: CommentCreaReduser,
        comment_ans: CommentAnsReduser,
        new: NewReduser,
        news: NewsReduser
        
    }
});