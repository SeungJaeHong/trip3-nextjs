import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../store'
import {LoggedInUser} from "../types"
import SessionClient from "../lib/SessionClient"

export type AuthState = {
    user: LoggedInUser
    loading: boolean
}

const initialState: AuthState = {
    user: <LoggedInUser>{},
    loading: false
}

export const login = createAsyncThunk('auth/login', async (userData: {userName: string, password: string}, { rejectWithValue }) => {
    try {
        const { userName, password } = userData
        const result = await SessionClient.get('/sanctum/csrf-cookie').then(async (response) => {
            const res = await SessionClient.post('/login', {
                name: userName,
                password: password
            })

            return res.data
        })

        return result

    } catch (err: any) {
        //console.log('error login', err.response)
        return rejectWithValue(err.response.data)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<LoggedInUser>) => {
            state.user = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.loading = false
                state.user = payload
            })
            .addCase(login.rejected, state => {
                state.loading = false
            })
    },
})

export const {
    setUser
} = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user
export const selectLoadingUser = (state: RootState) => state.auth.loading

export default authSlice.reducer