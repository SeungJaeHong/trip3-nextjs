import App from 'next/app'
import '../styles/globals.scss'
import NextNprogress from 'nextjs-progressbar'
import MainLayout from '../layouts/MainLayout'
import {AuthProvider} from "../context/AuthContext"
import ApiClient from "../lib/ApiClient"

function MyApp({ Component, pageProps }) {

    const user = pageProps?.user
    //console.log(user, 'user app')

    return (
        <AuthProvider authUser={user}>
            <NextNprogress
                color="#37a0eb"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                options={{ showSpinner: false }}
            />
            <Component {...pageProps} />

            {/*<MainLayout component={Component}>
                <Component {...pageProps} />
            </MainLayout>*/}
        </AuthProvider>
    )
}

// this makes every page SSR
// not recommended approach but we always get the user first this way
// probably changes later
/*MyApp.getInitialProps = async appContext => {
    const appProps = await App.getInitialProps(appContext)
    let user = undefined

    console.log('user')

    try {
        let res = await ApiClient.get('/user')
        user = res.data
    } catch (error) {
        //console.log(error, 'error user')
    }

    return { ...appProps, user }
}*/

export default MyApp
