import useSWR from "swr"
import {getUser} from "./services/auth.service"

export default function useUser() {
    const { data, mutate, error } = useSWR('get_user', getUser, {
        shouldRetryOnError: false
    })
    const loading = !data && !error
    const userIsLoggedIn = !error && data && data?.id > 0

    return {
        loading,
        userIsLoggedIn,
        user: data,
        mutate
    }
}