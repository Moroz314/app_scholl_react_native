import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios"

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params) => {
        const { data }  = await axios.post("/auth/login", params)
        return data;
})

export const fetchAuthMe = createAsyncThunk('auth/fetchUserMe', async () => {
    const { data }  = await axios.get("/auth/me")
    return data;
})

const initialState = {
    data: null,
    status: 'loading'
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.data = null,
            state.status = 'loading'
        }),
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.data = action.payload,
            state.status = 'loaded'
        }),
        builder.addCase(fetchAuth.rejected, (state) => {
            state.data = null,
            state.status = 'error'
        }),
        builder.addCase(fetchAuthMe.pending, (state) => {
            state.data = null,
            state.status = 'loading'
        }),
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.data = action.payload,
            state.status = 'loaded'
        }),
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.data = null,
            state.status = 'error'
        })
    }    
    
})

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const selectIsData = (state) => state.auth.data;


export const  authReduser = authSlice.reducer;

export const { logout } = authSlice.actions;