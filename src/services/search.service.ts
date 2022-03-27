import ApiClient from '../lib/ApiClient'
import { AxiosResponse } from 'axios'

export type DestinationSearchResult = {
    id: number
    name: string
    slug: string
    parent_name?: string
}

export type FlightSearchResult = {
    id: number
    title: string
    slug: string
}

export type ForumSearchResult = {
    id: number
    title: string
    slug: string
    type: string
}

export const frontpageSearch = async (
    value: string
): Promise<
    AxiosResponse<{
        destinations: DestinationSearchResult[]
        flights: FlightSearchResult[]
        forum: ForumSearchResult[]
        total: number
    }>
> => {
    return await ApiClient.get('/frontpage_search?q=' + value)
}

export const search = async (
    value: string
): Promise<
    AxiosResponse<{
        items: any[]
        total: number
    }>
    > => {
    return await ApiClient.get('/search?q=' + value)
}