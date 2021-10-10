import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../store'
import {LoggedInUser} from "../types"
import ApiClient from "../lib/ApiClient"

export type AuthState = {
    user: LoggedInUser|null,
    loading: boolean
}

const initialState: AuthState = {
    user: null,
    loading: false
}

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        const res = await ApiClient.post('/auth/logout')
        return res.data
    } catch (err: any) {
        throw err
        //return rejectWithValue(err.response.data)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<LoggedInUser|null>) {
            state.user = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(logout.pending, state => {
                state.loading = true
            })
            .addCase(logout.fulfilled, (state, { payload }) => {
                state.loading = false
                state.user = null
            })
            .addCase(logout.rejected, state => {
                state.loading = false
            })
    },
})

export const {
    setUser
} = authSlice.actions

export const selectUser = (state: RootState) => <LoggedInUser|null>state.auth.user
export const selectUserIsLoggedIn = (state: RootState) => (state.auth.user?.id !== undefined)

export default authSlice.reducer