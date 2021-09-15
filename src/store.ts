import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
import authReducer from './redux/auth'
import {useMemo} from "react"

export function makeStore(preloadedState = undefined) {
    return configureStore({
        reducer: {
            auth: authReducer,
        },
        preloadedState: preloadedState
    })
}

let store: any

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const initializeStore = (preloadedState = undefined) => {
    let _store = store ?? makeStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        // @ts-ignore
        _store = makeStore({...store.getState(), ...preloadedState})
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState: undefined) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}

export default store
