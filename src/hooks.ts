import useSWR from 'swr'
import { getUser } from './services/auth.service'
import { getUnreadMessageCount } from './services/user.service'
import { useCallback, useEffect, useRef } from 'react'

export function useUser() {
    const { data, mutate, error } = useSWR('get_user', getUser, {
        shouldRetryOnError: false,
    })
    const loading = !data && !error
    const userIsLoggedIn = !error && data && data?.id > 0

    return {
        loading,
        userIsLoggedIn,
        user: data,
        mutate,
    }
}

export function useUnreadMessageCount() {
    const { user } = useUser()
    const { data, mutate } = useSWR(user && user?.id > 0 ? 'get_unread_message_count' : null, getUnreadMessageCount, {
        shouldRetryOnError: false,
        revalidateOnFocus: false,
    })

    return {
        unreadMessageCount: data?.data,
        mutate,
    }
}

export function useIsMounted() {
    const isMounted = useRef(false)

    useEffect(() => {
        isMounted.current = true

        return () => {
            isMounted.current = false
        }
    }, [])

    return useCallback(() => isMounted.current, [])
}
