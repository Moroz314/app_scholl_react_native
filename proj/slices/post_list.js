import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios"

export const fetchPostsList = createAsyncThunk('post/fetchPost', async (params) => {  
        const { data }  = await axios.get(`/posts/${params}`)
        return data;
})
export const fetchPostsPlusLike = createAsyncThunk('post/fetchPostPlus', async (params) => {  
    const { data }  = await axios.put(`/like_plus/${params}`)
    return data;
})
export const fetchPostsMinusLike = createAsyncThunk('post/fetchPostMinus', async (params) => {  
    const { data }  = await axios.put(`/like_minus/${params}`)
    return data;
})

const initialState = {
    post: {
        items: [],
        status: 'loading'
    }
}


const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPostsList.pending, (state) => {
            state.items = [],
            state.status = 'loading'
        }),
        builder.addCase(fetchPostsList.fulfilled, (state, action) => {
            state.items = action.payload,
            state.status = 'loaded'
        }),
        builder.addCase(fetchPostsList.rejected, (state) => {
            state.items = [],
            state.status = 'error'
        }),
        builder.addCase(fetchPostsPlusLike.pending, (state) => {
            state.items = [],
            state.status = 'loading'
        }),
        builder.addCase(fetchPostsPlusLike.fulfilled, (state, action) => {
            state.items = action.payload,
            state.status = 'loaded'
        }),
        builder.addCase(fetchPostsPlusLike.rejected, (state) => {
            state.items = [],
            state.status = 'error'
        }),
        builder.addCase(fetchPostsMinusLike.pending, (state) => {
            state.items = [],
            state.status = 'loading'
        }),
        builder.addCase(fetchPostsMinusLike.fulfilled, (state, action) => {
            state.items = action.payload,
            state.status = 'loaded'
        }),
        builder.addCase(fetchPostsMinusLike.rejected, (state) => {
            state.items = [],
            state.status = 'error'
        })
       
    }    
    
})

export const selectIsPost = (state) => state.post;


export const  PostReduser = postSlice.reducer;
