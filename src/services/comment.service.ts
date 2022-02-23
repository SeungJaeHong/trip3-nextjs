import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"
import {Comment} from "../types"

export const postComment = async (value: string, contentId: number, type = 'forum'): Promise<AxiosResponse> => {
    return await ApiClient.post('/' + type + '/' + contentId + '/comment', {
        body: value
    })
}

export const updateComment = async (comment: Comment, value: string, type = 'forum'): Promise<AxiosResponse> => {
    return await ApiClient.post('/' + type + '/' + comment.commentableId + '/comment/' + comment.id, {
        body: value
    })
}

export const likeComment = async (comment: Comment, value: boolean, type = 'forum'): Promise<AxiosResponse> => {
    return await ApiClient.post('/' + type + '/' + comment.commentableId + '/comment/' + comment.id + '/like', {
        value: value
    })
}

export const toggleCommentStatus = async (comment: Comment, value: boolean, type = 'forum'): Promise<AxiosResponse> => {
    return await ApiClient.post('/' + type + '/' + comment.commentableId + '/comment/' + comment.id + '/status', {
        value: value
    })
}