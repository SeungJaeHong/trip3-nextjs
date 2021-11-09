import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"
import {Content} from "../types"

export const addPost = async (formValues: any): Promise<AxiosResponse> => {
    const result = await ApiClient.post('/forum/create', formValues)
    return result
}

export const updatePost = async (post: Content, formValues: any): Promise<AxiosResponse> => {
    const result = await ApiClient.post('/forum/' + post.id + '/updatePost', formValues)
    return result
}

export const togglePostStatus = async (content: Content, value: boolean): Promise<AxiosResponse> => {
    const result = await ApiClient.post('/forum/' + content.id + '/status', {
        value: value
    })

    return result
}

