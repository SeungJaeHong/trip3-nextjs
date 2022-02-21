import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios";

export const getLatestTravelmates = async () => {
    return await ApiClient.get('/travelmates/latest')
}

export const storeTravelmate = async (formValues: any): Promise<AxiosResponse> => {
    return await ApiClient.post('/travelmates/store', formValues)
}