import ApiClient from "../lib/ApiClient"

export const getLatestFlights = async () => {
    return await ApiClient.get('/flights/latest')
}

export const parseFlightBody = async (body: string) => {
    return await ApiClient.post('/flight/format_body', {
        value: body
    })
}

export const storeFlight = async (values: any) => {
    const formData = new FormData()
    Object.keys(values).forEach(key => {
        if (Array.isArray(values[key])) {
            formData.append(key + '[]', values[key])
        } else {
            formData.append(key, values[key])
        }
    })

    return await ApiClient.post('/flight/store', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const publishFlight = async (flightId: number, status = true) => {
    return await ApiClient.post('/flight/' + flightId + '/publish', {
        status: status
    })
}