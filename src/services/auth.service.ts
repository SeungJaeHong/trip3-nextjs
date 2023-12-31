import ApiClient from '../lib/ApiClient'
import { AxiosResponse } from 'axios'
import { User } from '../types'

export const getUser = async (): Promise<User> => {
    try {
        const res = await ApiClient.get('/user')
        return res.data
    } catch (error) {
        throw error
    }
}

export const login = async (name: string, password: string, remember_me: boolean): Promise<AxiosResponse> => {
    return await ApiClient.post('/auth/login', {
        name,
        password,
        remember_me,
    })
}

export const logout = async (): Promise<AxiosResponse> => {
    return await ApiClient.post('/auth/logout')
}

export const createUserOrLogin = async (name: string, email: string, imageUrl?: string): Promise<AxiosResponse> => {
    return await ApiClient.post('/auth/login_or_create', {
        name,
        email,
        imageUrl
    })
}

export const register = async (name: string, email: string, password: string): Promise<AxiosResponse> => {
    return await ApiClient.post('/auth/register', {
        name,
        password,
        email,
    })
}

export const forgotPassword = async (email: string): Promise<AxiosResponse> => {
    return await ApiClient.post('/auth/forgot-password', {
        email,
    })
}

export const resetPassword = async (email: string, password: string, token: string): Promise<AxiosResponse> => {
    return await ApiClient.post('/auth/reset-password', {
        email,
        password,
        token
    })
}
