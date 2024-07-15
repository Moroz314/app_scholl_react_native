import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios"

export const fetchCommentsList = createAsyncThunk('post/fetchComment', async (params) => {  
        const { data }  = await axios.get(`/comment/${params}`)
        return data;
})



const initialState = {
        items: [],
        status: 'loading'

}


const postSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        logout: (state) => {
            state.items = null
        }
    },
    extraReducers: (builder) => {
        //вывод комментариев
        builder.addCase(fetchCommentsList.pending, (state) => {
            state.items = [],
            state.status = 'loading'
        }),
        builder.addCase(fetchCommentsList.fulfilled, (state, action) => {
            state.items = action.payload,
            state.status = 'loaded'
        }),
        builder.addCase(fetchCommentsList.rejected, (state) => {
            state.items = [],
            state.status = 'error'
        })
    
       
    }    
    
})

export const selectIsComment = (state) => state.comment;


export const  CommentReduser = postSlice.reducer;