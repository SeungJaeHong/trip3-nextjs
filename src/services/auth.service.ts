import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"

export const login = async (name: string, password: string): Promise<AxiosResponse> => {
    const result = await ApiClient.post('/auth/login', {
        name,
        password,
    })

    return result

    /*try {
        const result = await ApiClient.post('/auth/login', {
            name,
            password,
        })

        if (result.status === 200) {
            console.log('set user')
        }
    } catch (e: any) {
        if (e.response && e.response.status === 422) return e.response;
        console.error('Cannot login', e.message);
        return false
    }*/
}
