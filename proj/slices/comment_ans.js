import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios"

export const fetchCommentsAnsList = createAsyncThunk('comment_ans/fetchCommentsAnsList', async (params) => {  
    const { data }  = await axios.get(`/comment_ans/${params}`)
    return data;
})

 


const initialState = {
    items: [],
    status: 'loading'
}


const postSlice = createSlice({
    name: 'commentans',
    initialState,
    extraReducers: (builder) => {
        //вывод комментариев
        builder.addCase(fetchCommentsAnsList.pending, (state) => {
            state.items = [],
            state.status = 'loading'
        }),
        builder.addCase(fetchCommentsAnsList.fulfilled, (state, action) => {
            state.items = action.payload,
            state.status = 'loaded'
        }),
        builder.addCase(fetchCommentsAnsList.rejected, (state) => {
            state.items = [],
            state.status = 'error'
        })
    }    
    
})

export const selectIsCommentAns = (state) => state.comment_ans;


export const  CommentAnsReduser = postSlice.reducer;


