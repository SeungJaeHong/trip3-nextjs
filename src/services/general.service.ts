import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"
import {Image} from "../types"

export const getLatestImages = async (): Promise<AxiosResponse<Image[]>> => {
    return await ApiClient.get('/frontpage/images')
}