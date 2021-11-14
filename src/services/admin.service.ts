import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"

export const getForumPosts = async (): Promise<AxiosResponse> => {
    const result = await ApiClient.get('/admin/forum')
    return result
}

