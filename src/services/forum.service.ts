import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"

export const addPost = async (formValues: any): Promise<AxiosResponse> => {
    const result = await ApiClient.post('/forum/create', formValues)
    return result
}

