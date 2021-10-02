import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"

export const login = async (name: string, password: string, remember_me: boolean): Promise<AxiosResponse> => {
    const result = await ApiClient.post('/auth/login', {
        name,
        password,
        remember_me
    })

    return result
}

export const createUserOrLogin = async (name: string, email: string): Promise<AxiosResponse> => {
    const result = await ApiClient.post('/auth/login_or_create', {
        name,
        email,
    })

    return result
}
