import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"
import {TravelmateContent} from "../types"

export const getLatestTravelmates = async () => {
    return await ApiClient.get('/travelmates/latest')
}

export const storeTravelmate = async (formValues: any): Promise<AxiosResponse> => {
    return await ApiClient.post('/travelmates/store', formValues)
}

export const updateTravelmate = async (travelmate: TravelmateContent, formValues: any): Promise<AxiosResponse> => {
    return await ApiClient.post('/travelmate/' + travelmate.id + '/update', formValues)
}

export const toggleTravelmateStatus = async (travelmate: TravelmateContent, value: boolean): Promise<AxiosResponse> => {
    return await ApiClient.post('/travelmate/' + travelmate.id + '/status', {
        value: value
    })
}