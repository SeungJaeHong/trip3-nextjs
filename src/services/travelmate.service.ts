import ApiClient from "../lib/ApiClient"

export const getLatestTravelmates = async () => {
    return await ApiClient.get('/travelmates/latest')
}