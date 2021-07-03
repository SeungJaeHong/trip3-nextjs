import ApiClient from '../lib/ApiClient'

export const getLatestFlights = async () => {
    const flights = await ApiClient.get('/flights/latest')
    return flights
}