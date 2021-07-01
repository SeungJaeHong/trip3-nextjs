import ApiClient from '../lib/ApiClient'

export const getNewsData = async () => {
    const news = await ApiClient.get('/frontpage/news')
    return news
}

export const getFlightOffersData = async () => {
    const flights = await ApiClient.get('/frontpage/flight_offers')
    return flights
}