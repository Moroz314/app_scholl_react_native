import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios"

export const fetchPosts = createAsyncThunk('posts/fetchAllPosts', async (params) => {  
        const { data }  = await axios.post("/posts/tag", params)
        return data;
})

export const fetchDeletePosts = createAsyncThunk('posts/fetchDeletePosts', async (params) => {  
   await axios.delete(`/posts/${params}`)
})

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    }
}


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        //получение статей
        builder.addCase(fetchPosts.pending, (state) => {
            state.items = [],
            state.status = 'loading'
        }),
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.items = action.payload,
            state.status = 'loaded'
        }),
        builder.addCase(fetchPosts.rejected, (state) => {
            state.items = [],
            state.status = 'error'
        })

    //удаление статьи
        builder.addCase(fetchDeletePosts.pending, (state) => {
            state.posts.items = state.posts.items.filter((obj) => obj._id == action.payload)
        })
    }    
    
})

export const selectIsPosts = (state) => state.posts;


export const  PostsReduser = postSlice.reducer;
