import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios"

export const fetchCreateCommentsList = createAsyncThunk('post/fetchComment', async (params) => {  
        const { data }  = await axios.post('/commawdaent', params)
        return data;
})



const initialState = {
    items: [],
    status: 'loading'
}


const postSlice = createSlice({
    name: 'creatCom',
    initialState,
    reducers: {
        logout: (state) => {
            state.items = null
        }
    },
    extraReducers: (builder) => {
        //вывод комментариев
        builder.addCase(fetchCreateCommentsList.pending, (state) => {
            state.items = [],
            state.status = 'loading'
        }),
        builder.addCase(fetchCreateCommentsList.fulfilled, (state, action) => {
            state.items = action.payload,
            state.status = 'loaded'
        }),
        builder.addCase(fetchCreateCommentsList.rejected, (state) => {
            state.items = [],
            state.status = 'error'
        })
    
       
    }    
    
})



export const  CommentCreaReduser = postSlice.reducer;
