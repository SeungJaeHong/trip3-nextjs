import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"

export const postComment = async (value: string, contentId: number): Promise<AxiosResponse> => {
    const result = await ApiClient.post('/forum/' + contentId + '/comment', {
        body: value
    })

    return result
}

