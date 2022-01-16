import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"
import {Destination, Image} from "../types"

export const getDestinationImages = async (destination: Destination): Promise<AxiosResponse<{images: Image[], imageCount: number, lastImage?: Image}>> => {
    return await ApiClient.get('/destination/' + destination.id + '/images')
}