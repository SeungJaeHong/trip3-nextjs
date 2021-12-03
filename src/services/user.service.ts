import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"

export const getLastComments = async (id: number): Promise<AxiosResponse> => {
    return await ApiClient.get('/user/' + id + '/comments')
}

export const updateUserProfile = async (userId: number, values: any): Promise<AxiosResponse> => {
    return await ApiClient.post('/user/' + userId + '/update', values)
}
