import axios, {AxiosInstance} from 'axios'
import {GetServerSidePropsContext} from "next"

const ApiClientSSR = (context: GetServerSidePropsContext): AxiosInstance => {
    const cookie = context.req.headers.cookie
    return axios.create({
        withCredentials: true,
        baseURL: process.env.API_BASE_URL,
        headers: {
            Accept: 'application/json',
            Referer: String(process.env.APP_URL),
            Cookie: cookie ?? ''
        }
    })
}

export default ApiClientSSR