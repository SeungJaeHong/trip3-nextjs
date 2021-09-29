import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../store'
import {LoggedInUser} from "../types"
import SessionClient from "../lib/SessionClient"
import ApiClient from "../lib/ApiClient"
import axios from "axios"

export type AuthState = {
    user: LoggedInUser|null,
    loading: boolean
}

const initialState: AuthState = {
    user: null,
    loading: false
}

/*export const login = createAsyncThunk('auth/login', async (userData: {userName: string, password: string}, { rejectWithValue }) => {
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
})*/

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        const res = await SessionClient.get('/logout')
        return res.data
    } catch (err: any) {
        throw err
        //return rejectWithValue(err.response.data)
    }
})

/*export const getUser = createAsyncThunk('auth/getUser', async () => {
    try {
        const res = await SessionClient.get('/api/user')

        console.log(res.data, 'getUser')

        return res.data

    } catch (err: any) {
        console.log(err.response.status, 'error getUser')
        throw err
        //return rejectWithValue(err.response.data)
    }
})*/

/*export const getUserWithCookie = createAsyncThunk(
    'auth/getUserWithCookie',
    async (cookie) => {
        try {
            //const response = await axios.get('http://localhost:3000/api/auth', {
            const response = await axios.get('http://localhost:8000/api/user', {
                // @ts-ignore
                headers: {
                    //cookie: cookie
                    Accept: 'application/json',
                    Cookie: cookie,
                    Referer: 'http://localhost:3000'
                }
            })

            const data = response.data
            return response.data

        } catch (e: any) {
            console.log('error getUserWithCookie', e.response.data)
        }
    }
)*/

/*export const getUser = createAsyncThunk(
    'auth/getUser',
    async (cookie) => {
        try {
            const response = await ApiClient.get('/user')
            return response.data
        } catch (e: any) {
            console.log('error getUser', e.response.data)
            throw e
        }
    }
)*/

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