import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"

export const postComment = async (value: string, contentId: number): Promise<AxiosResponse> => {
    const result = await ApiClient.post('/news/' + contentId + '/comment', {
        body: value
    })

    return result
}

export const rateComment = async (contentId: number, commentId: number, value: boolean): Promise<AxiosResponse> => {
    const result = await ApiClient.post('/news/' + contentId + '/comment/' + commentId + '/flag', {
        value: value
    })

    return result
}