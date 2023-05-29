import ApiClient from '../lib/ApiClient'
import { AxiosResponse } from 'axios'
import {Admin, ContentMarketingFullPost, ContentMarketingPost, ForumPostType} from '../types'

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

export const getContentMarketingPosts = async (page?: number): Promise<AxiosResponse> => {
    return await ApiClient.get('/admin/content-marketing?page=' + page)
}

export const getContentMarketingPostById = async (id: number): Promise<AxiosResponse> => {
    return await ApiClient.get('/admin/content-marketing/' + id)
}

export const addContentMarketingPost = async (formValues: any): Promise<AxiosResponse> => {
    const formData = new FormData()
    Object.keys(formValues).forEach((key) => {
        if (formValues[key]) {
            if (Array.isArray(formValues[key])) {
                formValues[key].forEach(function (item: any) {
                    formData.append(key + '[]', item.toString())
                })
            } else {
                formData.append(key, formValues[key])
            }
        }
    })

    return await ApiClient.post('/admin/content-marketing/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const updateContentMarketingPost = async (post: ContentMarketingFullPost, formValues: any): Promise<AxiosResponse> => {
    const formData = new FormData()
    Object.keys(formValues).forEach((key) => {
        if (formValues[key]) {
            if (Array.isArray(formValues[key])) {
                formValues[key].forEach(function (item: any) {
                    formData.append(key + '[]', item.toString())
                })
            } else {
                formData.append(key, formValues[key])
            }
        }
    })

    return await ApiClient.post('/admin/content-marketing/' + post.id + '/update', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const toggleActive = async (post: ContentMarketingPost, checked: boolean): Promise<AxiosResponse> => {
    return await ApiClient.put('/admin/content-marketing/' + post.id + '/active', {active: checked})
}

export const getModerators = async (): Promise<AxiosResponse<Admin[]>> => {
    return await ApiClient.get('/admin/users?type=admin')
}
