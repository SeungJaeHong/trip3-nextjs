import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"

export const getLastComments = async (id: number): Promise<AxiosResponse> => {
    return await ApiClient.get('/user/' + id + '/comments')
}
