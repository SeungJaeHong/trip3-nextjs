import {Destination} from "../types";
import {AxiosResponse} from "axios";
import ApiClient from "../lib/ApiClient";

export const uploadImage = async (image: File, title: string, destinations: Destination[]): Promise<AxiosResponse> => {
    let formData = new FormData()
    formData.append('image', image)
    formData.append('title', title)

    destinations.map(destination => {
        formData.append('destinations[]', destination.id.toString())
    })

    return await ApiClient.post('/image/uploadImage', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}