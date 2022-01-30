import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"

export const getLatestNews = async () => {
    return await ApiClient.get('/news/latest')
}

export const postComment = async (value: string, contentId: number): Promise<AxiosResponse> => {
    return await ApiClient.post('/news/' + contentId + '/comment', {
        body: value
    })
}

export const rateComment = async (contentId: number, commentId: number, value: boolean): Promise<AxiosResponse> => {
    return await ApiClient.post('/news/' + contentId + '/comment/' + commentId + '/flag', {
        value: value
    })
}

export const parseNewsBody = async (body: string) => {
    return await ApiClient.post('/news/format_body', {
        value: body
    })
}