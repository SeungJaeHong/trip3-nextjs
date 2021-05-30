import axios from 'axios'

const SessionClient = axios.create({
    withCredentials: true,
    baseURL: process.env.SESSION_AUTH_URL,
})

export default SessionClient