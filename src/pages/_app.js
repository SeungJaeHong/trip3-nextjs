//import App from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store'
import NextNprogress from 'nextjs-progressbar'
import '../styles/globals.scss'
//import {AuthProvider} from "../context/AuthContext"

function MyApp({ Component, pageProps }) {

    const user = pageProps?.user
    //console.log(user, 'user app')

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
// not recommended approach but we always get the user first this way
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
