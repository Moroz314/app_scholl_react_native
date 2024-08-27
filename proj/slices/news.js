import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios"

export const fetchNews = createAsyncThunk('news/fetchAllNews', async () => {  
        const { data }  = await axios.get("/news")
        return data;
})

export const fetchDeletePosts = createAsyncThunk('posts/fetchDeletePosts', async (params) => {  
   await axios.delete(`/news/${params}`)
})

const initialState = {
    news: {
        items: [],
        status: 'loading'
    }
}


const postSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        //получение статей
        builder.addCase(fetchNews.pending, (state) => {
            state.items = [],
            state.status = 'loading'
        }),
        builder.addCase(fetchNews.fulfilled, (state, action) => {
            state.items = action.payload,
            state.status = 'loaded'
        }),
        builder.addCase(fetchNews.rejected, (state) => {
            state.items = [],
            state.status = 'error'
        })

    //удаление статьи
        builder.addCase(fetchDeletePosts.pending, (state) => {
            state.posts.items = state.posts.items.filter((obj) => obj._id == action.payload)
        })
    }    
    
})

export const selectIsNews = (state) => state.news;


export const  NewsReduser = postSlice.reducer;
