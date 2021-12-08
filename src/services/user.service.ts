import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"
import {UserMessage} from "../types";

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

