import ApiClient from '../lib/ApiClient'
import { FlightContent } from '../types'
import { objectToQueryString } from '../helpers'

export const getLatestFlights = async (take = 3, excludeId?: number) => {
    const urlParams = {
        take: take,
        id: excludeId,
    }

    const queryString = objectToQueryString(urlParams)
    return await ApiClient.get('/flights/latest?' + queryString)
}

export const parseFlightBody = async (body: string) => {
    return await ApiClient.post('/flight/format_body', {
        value: body,
    })
}

export const storeFlight = async (values: any) => {
    const formData = new FormData()
    Object.keys(values).forEach((key) => {
        if (values[key]) {
            if (Array.isArray(values[key])) {
                values[key].forEach(function (item: any) {
                    formData.append(key + '[]', item.toString())
                })
            } else {
                formData.append(key, values[key])
            }
        }
    })

    return await ApiClient.post('/flight/store', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const updateFlight = async (flight: FlightContent, values: any) => {
    const formData = new FormData()
    Object.keys(values).forEach((key) => {
        if (values[key]) {
            if (Array.isArray(values[key])) {
                values[key].forEach(function (item: any) {
                    formData.append(key + '[]', item.toString())
                })
            } else {
                formData.append(key, values[key])
            }
        }
    })

    return await ApiClient.post('/flight/' + flight.id + '/update', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const publishFlight = async (flightId: number, status = true) => {
    return await ApiClient.post('/flight/' + flightId + '/publish', {
        status: status,
    })
}
