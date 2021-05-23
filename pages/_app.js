import '../styles/globals.css'
import MainLayout from '../components/layouts/MainLayout'

function MyApp({ Component, pageProps }) {
    return (
        <MainLayout component={Component}>
            <Component {...pageProps} />
        </MainLayout>
    )
}

export default MyApp
