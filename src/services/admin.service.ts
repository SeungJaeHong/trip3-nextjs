import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"

export const getForumPosts = async (page?: number): Promise<AxiosResponse> => {
    const result = await ApiClient.get('/admin/forum?page=' + page)
    return result
}

export const getForumPostById = async (id: number): Promise<AxiosResponse> => {
    const result = await ApiClient.get('/admin/forum/' + id)
    return result
}

