import ApiClient from '../lib/ApiClient'
import { AxiosResponse } from 'axios'
import {User} from "../types";
import {objectToQueryString} from "../helpers";

export type DestinationSearchResult = {
    id: number
    name: string
    slug: string
    parent_name?: string
}

export type FlightSearchResult = {
    id: number
    title: string
    body: string
    slug: string
    created_at: string
    image: string
}

export type ForumSearchResult = {
    id: number
    title: string
    body: string
    slug: string
    type: string
    created_at: string
    user: User
}

export type FrontPageFlightSearchResult = {
    id: number
    title: string
    slug: string
}

export type FrontPageForumSearchResult = {
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
        flights: FrontPageFlightSearchResult[]
        forum: FrontPageForumSearchResult[]
        total: number
    }>
> => {
    return await ApiClient.get('/frontpage_search?q=' + value)
}

export const search = async (
    value: string,
    type: string,
    take?: number,
    offset?: number
): Promise<
    AxiosResponse<{
        items: any[]
        total: number
        page: number
    }>
    > => {
    const urlParams = objectToQueryString({
        q: value,
        type: type,
        take: take,
        offset: offset
    })
    return await ApiClient.get('/search?' + urlParams)
}