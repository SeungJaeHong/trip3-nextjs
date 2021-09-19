import axios from 'axios'
import {GetServerSidePropsContext} from "next"

const ApiClientSSR = (context: GetServerSidePropsContext) => {
    const cookie = context.req.headers.cookie
    return axios.create({
        withCredentials: true,
        baseURL: process.env.API_BASE_URL,
        headers: {
            Accept: 'application/json',
            Referer: process.env.APP_URL,
            Cookie: cookie ?? {}
        }
    })
}

export default ApiClientSSR