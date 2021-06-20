import axios from 'axios'

const ApiClient = axios.create({
    withCredentials: true,
    baseURL: process.env.API_BASE_URL
})

export default ApiClient