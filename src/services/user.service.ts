import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"
import {Destination, Image, UserMessage} from "../types"

export const getLastComments = async (id: number): Promise<AxiosResponse> => {
    return await ApiClient.get('/user/' + id + '/comments')
}

export const updateUserProfile = async (userId: number, values: any): Promise<AxiosResponse> => {
    return await ApiClient.post('/user/' + userId + '/update', values)
}

export const getMyDestinationsData = async (): Promise<AxiosResponse> => {
    return await ApiClient.get('/profile/destinations')
}

export const updateMyDestinations = async (visitedIds: number[], wantsToGoIds: number[]): Promise<AxiosResponse> => {
    return await ApiClient.post('/profile/update_destinations', {
        'visited': visitedIds,
        'wantsToGo': wantsToGoIds
    })
}

export const getMyMessages = async (): Promise<AxiosResponse<UserMessage[]>> => {
    return await ApiClient.get('/profile/messages')
}

export const getChatWithUser = async (userId: number): Promise<AxiosResponse> => {
    return await ApiClient.get('/profile/messages/' + userId)
}

export const sendMessageToUser= async (userId: number, message: string): Promise<AxiosResponse> => {
    return await ApiClient.post('/profile/messages/' + userId + '/send', {
        message: message
    })
}

export const getUserImages = async (userId: number): Promise<AxiosResponse<{images: Image[], imageCount: number, lastImage?: Image}>> => {
    return await ApiClient.get('/user/' + userId + '/images')
}

export const uploadImage = async (userId: number, image: File, title: string, destinations: Destination[]): Promise<AxiosResponse> => {
    let formData = new FormData()
    formData.append('image', image)
    formData.append('title', title)

    destinations.map(destination => {
        formData.append('destinations[]', destination.id.toString())
    })

    return await ApiClient.post('/user/' + userId + '/uploadImage', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

