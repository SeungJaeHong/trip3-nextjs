import ApiClient from "../lib/ApiClient"

export const getLatestFlights = async () => {
    return await ApiClient.get('/flights/latest')
}