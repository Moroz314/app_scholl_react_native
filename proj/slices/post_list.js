import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios"

export const fetchPostsList = createAsyncThunk('post/fetchPost', async (params) => {  
        const { data }  = await axios.get(`/posts/${params}`)
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
        })
       
    }    
    
})

export const selectIsPost = (state) => state.post;


export const  PostReduser = postSlice.reducer;
