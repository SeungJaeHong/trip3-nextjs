import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"
import {Destination, Topic} from "../types"

export const getLatestNews = async () => {
    return await ApiClient.get('/news/latest')
}

export const parseNewsBody = async (body: string) => {
    return await ApiClient.post('/news/format_body', {
        value: body
    })
}

export const addNews = async (title: string, image: File, body: string, destinations: Destination[], topics?: Topic[]) => {
    let formData = new FormData()
    formData.append('title', title)
    formData.append('image', image)
    formData.append('body', body)

    destinations.map(destination => {
        formData.append('destinations[]', destination.id.toString())
    })

    if (topics && topics.length) {
        topics.map(topic => {
            formData.append('topics[]', topic.id.toString())
        })
    }

    return await ApiClient.post('/news/store', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const updateNews = async (newsId: number, title: string, body: string, destinations: Destination[], image?: File, topics?: Topic[]): Promise<AxiosResponse> => {
    let formData = new FormData()
    formData.append('title', title)
    formData.append('body', body)

    if (image) {
        formData.append('image', image)
    }

    destinations.map(destination => {
        formData.append('destinations[]', destination.id.toString())
    })

    if (topics && topics.length) {
        topics.map(topic => {
            formData.append('topics[]', topic.id.toString())
        })
    }

    return await ApiClient.post('/news/' + newsId + '/update', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const publishNews = async (newsId: number, status = true) => {
    return await ApiClient.post('/content/' + newsId + '/publish', {
        status: status
    })
}

