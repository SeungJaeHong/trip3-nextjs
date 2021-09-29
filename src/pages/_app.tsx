import App from 'next/app'
import type {AppProps, AppContext} from 'next/app'
import { Provider } from 'react-redux'
import {initializeStore, useStore} from '../store'
import NextNprogress from 'nextjs-progressbar'
import '../styles/globals.scss'
import {setUser} from "../redux/auth"
import ApiClient from "../lib/ApiClient"
import {LoggedInUser} from "../types"
import {AxiosResponse} from "axios"
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
    const store = useStore(pageProps.initialReduxState)
    return (
        <Provider store={store}>
            <NextNprogress
                color="#37a0eb"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                options={{ showSpinner: false }}
            />
            <Component {...pageProps} />
            <Toaster
                containerStyle={{
                    bottom: '32px',
                    left: '32px'
                }}
                toastOptions={{
                    success: {
                        style: {
                            background: '#8EDD65',
                            color: '#fff',
                            fontWeight: 500,
                            fontFamily: 'Sailec, sans-serif'
                        },
                    },
                    error: {
                        style: {
                            background: '#FF5050',
                            color: '#fff',
                            fontWeight: 500,
                            fontFamily: 'Sailec, sans-serif'
                        },
                    },
                }}
                position="bottom-left"
                reverseOrder={false}
            />
        </Provider>
    )
}

// this makes every page SSR
// not recommended approach but we always get the logged in user this way
// it also sets/renews both session variables on each request
MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext)
    const context = appContext.ctx
    const reduxStore = initializeStore()
    const { dispatch } = reduxStore

    //get logged in user
    const cookie = context.req ? context.req.headers.cookie : undefined
    let headers = {
        Accept: 'application/json',
    }

    if (context.req) {
        headers = {
            Accept: 'application/json',
            // @ts-ignore
            Referer: process.env.APP_URL,
            Cookie: cookie
        }
    }

    await ApiClient.get('/user', {
        headers: headers
    }).then((res: AxiosResponse<LoggedInUser>) => {
        dispatch(setUser(res.data))
        if (context.res && res?.headers['set-cookie']) {
            context.res.setHeader(
                'Set-Cookie',
                res.headers['set-cookie']
            )
        }
    }).catch(err => {
        if (err?.response?.status === 401) {
            dispatch(setUser(null))
        }

        if (context.res && err?.response?.headers['set-cookie']) {
            context.res.setHeader(
                'Set-Cookie',
                err.response.headers['set-cookie']
            )
        }
    })

    appProps.pageProps = {
        ...appProps.pageProps,
        initialReduxState: reduxStore.getState(),
    }

    return appProps
}

export default MyApp
