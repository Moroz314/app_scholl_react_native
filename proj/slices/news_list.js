import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios"

export const fetchNewssList = createAsyncThunk('news/fetchNews', async (params) => {  
        const { data }  = await axios.get(`/news/${params}`)
        console.log(data)
        return data;
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
        builder.addCase(fetchNewssList.pending, (state) => {
            state.items = [],
            state.status = 'loading'
        }),
        builder.addCase(fetchNewssList.fulfilled, (state, action) => {
            state.items = action.payload,
            state.status = 'loaded'
        }),
        builder.addCase(fetchNewssList.rejected, (state) => {
            state.items = [],
            state.status = 'error'
        })
    }    
    
})

export const selectIsNew = (state) => state.news;


export const  NewReduser = postSlice.reducer;
