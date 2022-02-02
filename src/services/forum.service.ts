import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"
import {Content} from "../types"

export const addPost = async (formValues: any): Promise<AxiosResponse> => {
    return await ApiClient.post('/forum/create', formValues)
}

export const updatePost = async (post: Content, formValues: any): Promise<AxiosResponse> => {
    return await ApiClient.post('/forum/' + post.id + '/updatePost', formValues)
}

export const togglePostStatus = async (content: Content, value: boolean): Promise<AxiosResponse> => {
    return await ApiClient.post('/forum/' + content.id + '/status', {
        value: value
    })
}

export const ratePost = async (content: Content, value: boolean): Promise<AxiosResponse> => {
    return await ApiClient.post('/forum/' + content.id + '/flag', {
        value: value
    })
}

