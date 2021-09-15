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
        </Provider>
    )
}

// this makes every page SSR
// not recommended approach but we always get the logged in user this way
MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext)
    const context = appContext.ctx
    const reduxStore = initializeStore()
    const { dispatch } = reduxStore

    //get logged in user
    const cookie = context.req ? {cookie: context.req.headers.cookie} : undefined
    await ApiClient.get('/user', {
        headers: {
            Accept: 'application/json',
            Referer: process.env.APP_URL,
            Cookie: cookie?.cookie ?? {}
        }
    }).then((res: AxiosResponse<LoggedInUser>) => {
        console.log(res.data, 'RES SUCCESS')
        dispatch(setUser(res.data))
        if (context.res && res?.headers['set-cookie']) {
            context.res.setHeader(
                'Set-Cookie',
                res.headers['set-cookie']
            )
        }
    }).catch(err => {
        //todo: unset user?
        console.log(err?.response, 'ERROR')
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
