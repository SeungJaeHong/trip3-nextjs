import useSWR from "swr"
import {getUser} from "./services/auth.service"

export default function useUser() {
    const { data, mutate, error } = useSWR('get_user', getUser)
    const loading = !data && !error
    const loggedIn = !error && data && data?.id > 0

    return {
        loading,
        loggedIn,
        user: data,
        mutate
    }
}