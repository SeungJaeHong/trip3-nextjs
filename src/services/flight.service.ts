import ApiClient from "../lib/ApiClient"

export const getLatestFlights = async () => {
    return await ApiClient.get('/flights/latest')
}

export const parseFlightBody = async (body: string) => {
    return await ApiClient.post('/flight/format_body', {
        value: body
    })
}