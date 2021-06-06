import App from 'next/app'
import '../styles/globals.scss'
import NextNprogress from 'nextjs-progressbar'
import MainLayout from '../layouts/MainLayout'
import {AuthProvider} from "../context/AuthContext"
import ApiClient from "../lib/ApiClient"

function MyApp({ Component, pageProps, user }) {
    return (
        <AuthProvider authUser={user}>
            <NextNprogress
                color="#37a0eb"
                startPosition={0.3}
                stopDelayMs={200}
                height="2"
                options={{ showSpinner: false }}
            />
            <MainLayout component={Component}>
                <Component {...pageProps} />
            </MainLayout>
        </AuthProvider>
    )
}

// this makes every page SSR
// not recommended approach but we always get the user first this way
// probably changes later
MyApp.getInitialProps = async appContext => {
    let user = undefined

    //todo: refactor to function
    try {
        let res = await ApiClient.get(`/user`)
        user = res.data
    } catch (error) {
        //console.log(error, 'error user')
    }

    // Call the page's `getInitialProps` and fill `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext)

    return { ...appProps, user }
}

export default MyApp
