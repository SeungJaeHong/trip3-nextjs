import ApiClient from '../lib/ApiClient'
import { AxiosResponse } from 'axios'
import { ForumPostType } from '../types'

export const getForumPosts = async (page?: number): Promise<AxiosResponse> => {
    return await ApiClient.get('/admin/forum?page=' + page)
}

export const getForumPostData = async (id: number, page: number): Promise<AxiosResponse> => {
    return await ApiClient.get('/admin/forum/' + id + '?page=' + page)
}

export const getForumPostById = async (id: number): Promise<AxiosResponse> => {
    return await ApiClient.get('/admin/forum/' + id + '/post')
}

export const addPost = async (formValues: any): Promise<AxiosResponse> => {
    return await ApiClient.post('/admin/forum/create', formValues)
}

export const updatePost = async (post: ForumPostType, formValues: any): Promise<AxiosResponse> => {
    return await ApiClient.post('/admin/forum/' + post.id + '/updatePost', formValues)
}

export const getHiddenForumPosts = async (page?: number): Promise<AxiosResponse> => {
    return await ApiClient.get('/admin/hidden/forum?page=' + page)
}

export const getHiddenFlights = async (page?: number): Promise<AxiosResponse> => {
    return await ApiClient.get('/admin/hidden/flights?page=' + page)
}

export const getHiddenNews = async (page?: number): Promise<AxiosResponse> => {
    return await ApiClient.get('/admin/hidden/news?page=' + page)
}

export const getHiddenTravelmates = async (page?: number): Promise<AxiosResponse> => {
    return await ApiClient.get('/admin/hidden/travelmates?page=' + page)
}
