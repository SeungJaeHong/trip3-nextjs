import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"
import {Comment} from "../types"

/*export const postComment = async (value: string, contentId: number): Promise<AxiosResponse> => {
    const result = await ApiClient.post('/forum/' + contentId + '/comment', {
        body: value
    })

    return result
}

export const updateComment = async (comment: Comment, value: string): Promise<AxiosResponse> => {
    const result = await ApiClient.post('/forum/' + comment.contentId + '/comment/' + comment.id, {
        body: value
    })

    return result
}

export const rateComment = async (contentId: number, commentId: number, value: boolean): Promise<AxiosResponse> => {
    const result = await ApiClient.post('/forum/' + contentId + '/comment/' + commentId + '/flag', {
        value: value
    })

    return result
}

export const toggleCommentStatus = async (contentId: number, commentId: number, value: boolean): Promise<AxiosResponse> => {
    const result = await ApiClient.post('/forum/' + contentId + '/comment/' + commentId + '/status', {
        value: value
    })

    return result
}*/

