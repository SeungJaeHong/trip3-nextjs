import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"
import {Comment} from "../types"

export const postComment = async (value: string, contentId: number, type = 'forum'): Promise<AxiosResponse> => {
    return await ApiClient.post('/' + type + '/' + contentId + '/comment', {
        body: value
    })
}

export const updateComment = async (comment: Comment, value: string, type = 'forum'): Promise<AxiosResponse> => {
    return await ApiClient.post('/' + type + '/' + comment.contentId + '/comment/' + comment.id, {
        body: value
    })
}

export const rateComment = async (comment: Comment, value: boolean, type = 'forum'): Promise<AxiosResponse> => {
    return await ApiClient.post('/' + type + '/' + comment.contentId + '/comment/' + comment.id + '/flag', {
        value: value
    })
}

export const toggleCommentStatus = async (comment: Comment, value: boolean, type = 'forum'): Promise<AxiosResponse> => {
    return await ApiClient.post('/' + type + '/' + comment.contentId + '/comment/' + comment.id + '/status', {
        value: value
    })
}