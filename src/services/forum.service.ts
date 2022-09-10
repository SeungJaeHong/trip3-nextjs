import ApiClient from '../lib/ApiClient'
import { AxiosResponse } from 'axios'
import { ForumPostType } from '../types'
import { objectToQueryString } from '../helpers'

export const addPost = async (formValues: any): Promise<AxiosResponse> => {
    return await ApiClient.post('/forum/create', formValues)
}

export const updatePost = async (post: ForumPostType, formValues: any): Promise<AxiosResponse> => {
    return await ApiClient.post('/forum/' + post.id + '/updatePost', formValues)
}

export const togglePostStatus = async (content: ForumPostType, value: boolean): Promise<AxiosResponse> => {
    return await ApiClient.post('/forum/' + content.id + '/status', {
        value: value,
    })
}

export const toggleFollow = async (content: ForumPostType, value: boolean): Promise<AxiosResponse> => {
    return await ApiClient.post('/forum/' + content.id + '/follow', {
        value: value,
    })
}

export const likePost = async (content: ForumPostType, value: boolean): Promise<AxiosResponse> => {
    return await ApiClient.post('/forum/' + content.id + '/like', {
        value: value,
    })
}

export const getLatestPosts = async (take = 3, excludeId?: number): Promise<AxiosResponse> => {
    const urlParams = {
        take: take,
        id: excludeId,
    }

    const queryString = objectToQueryString(urlParams)
    return await ApiClient.get('/forum/latest?' + queryString)
}
