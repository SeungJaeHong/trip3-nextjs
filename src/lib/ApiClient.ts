import axios from 'axios'

const ApiClient = axios.create({
    withCredentials: true,
    baseURL: process.env.API_BASE_URL,
    headers: {
        Accept: "application/json"
    }
})

export default ApiClient