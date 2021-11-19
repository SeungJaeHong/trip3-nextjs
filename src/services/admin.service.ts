import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"
import {Content} from "../types";

export const getForumPosts = async (page?: number): Promise<AxiosResponse> => {
    const result = await ApiClient.get('/admin/forum?page=' + page)
    return result
}

export const getForumPostData = async (id: number, page: number): Promise<AxiosResponse> => {
    const result = await ApiClient.get('/admin/forum/' + id + '?page=' + page)
    return result
}

export const getForumPostById = async (id: number): Promise<AxiosResponse> => {
    const result = await ApiClient.get('/admin/forum/' + id + '/post')
    return result
}

export const addPost = async (formValues: any): Promise<AxiosResponse> => {
    const result = await ApiClient.post('/admin/forum/create', formValues)
    return result
}

export const updatePost = async (post: Content, formValues: any): Promise<AxiosResponse> => {
    const result = await ApiClient.post('/admin/forum/' + post.id + '/updatePost', formValues)
    return result
}

