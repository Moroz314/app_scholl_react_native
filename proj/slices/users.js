import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios"

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const { data }  = await axios.get("/auth/users")

    return data;
})

const initialState = {
    data: null,
    status: 'loading'
}


const authSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: (builderr) => {
        builderr.addCase(fetchUsers.pending, (state) => {
            state.data = null,
            state.status = 'loading'
        }),
        builderr.addCase(fetchUsers.fulfilled, (state, action) => {
            state.data = action.payload,
            state.status = 'loaded'
        }),
        builderr.addCase(fetchUsers.rejected, (state) => {
            state.data = null,
            state.status = 'error'
        })
    }    
    
})
export const selectIsUsers = (state) => state.users.data;

export const  usersReduser = authSlice.reducer;