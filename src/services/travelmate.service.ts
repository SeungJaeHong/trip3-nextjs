import ApiClient from "../lib/ApiClient"
import {AxiosResponse} from "axios"
import {TravelmateContent} from "../types"
import {objectToQueryString} from "../helpers"

export const getLatestTravelmates = async (take = 3) => {
    const urlParams = {
        take: take
    }

    const queryString = objectToQueryString(urlParams)
    return await ApiClient.get('/travelmates/latest?' + queryString)
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