import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"
import {Image, UserMessage, UserProfile} from "../types"

export const getLastComments = async (id: number): Promise<AxiosResponse> => {
    return await ApiClient.get('/user/' + id + '/comments')
}

export const updateUserProfile = async (user: UserProfile, values: any): Promise<AxiosResponse<UserProfile>> => {
    const formDataObj = Object.keys(values).reduce((formData, key) => {
        if (values[key]) {
            if (key === 'image') {
                formData.append(key, values[key][0])
            } else {
                formData.append(key, values[key])
            }
        }
        return formData
    }, new FormData())

    return await ApiClient.post('/user/' + user.id + '/update', formDataObj, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
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

export const getUnreadMessageCount = async (): Promise<AxiosResponse> => {
    return await ApiClient.get('/profile/unread')
}

