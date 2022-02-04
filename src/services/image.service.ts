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

export const getInternalImages = async () => {
    return await ApiClient.get('/admin/internal_images')
}

export const uploadInternalImages = async (files: File[]) => {
    let formData = new FormData()
    files.map(file => {
        formData.append('images[]', file)
    })

    return await ApiClient.post('/admin/upload_images', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}