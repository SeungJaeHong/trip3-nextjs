import ApiClient from '../lib/ApiClient'

export const getLatestTravelmates = async () => {
    const travelmates = await ApiClient.get('/travelmates/latest')
    return travelmates
}