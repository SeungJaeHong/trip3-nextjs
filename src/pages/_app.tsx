import type {AppProps} from 'next/app'
import NextNprogress from 'nextjs-progressbar'
import '../styles/globals.scss'
import 'keen-slider/keen-slider.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <NextNprogress
                color="#37a0eb"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                options={{ showSpinner: false }}
            />
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme={'colored'}
            />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
