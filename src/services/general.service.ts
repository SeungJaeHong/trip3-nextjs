import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"
import {Image} from "../types"

export const getLatestImages = async (): Promise<AxiosResponse<{images: Image[], lastImage: Image}>> => {
    return await ApiClient.get('/frontpage/images')
}

export const hidePhoto = async (contentId: number): Promise<AxiosResponse> => {
    return await ApiClient.post('/content/' + contentId + '/hide_photo')
}