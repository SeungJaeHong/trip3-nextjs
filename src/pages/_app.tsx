import type {AppProps} from 'next/app'
import NextNprogress from 'nextjs-progressbar'
import '../styles/globals.scss'
import 'keen-slider/keen-slider.min.css'
import { Toaster } from 'react-hot-toast'

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
            <Toaster
                containerStyle={{
                    bottom: '32px',
                    left: '32px'
                }}
                toastOptions={{
                    success: {
                        style: {
                            //background: '#8EDD65',
                            //color: '#fff',
                            //color: '#6c747a',
                            fontWeight: 500,
                            fontFamily: 'Sailec, sans-serif'
                        },
                    },
                    error: {
                        style: {
                            //background: '#FF5050',
                            //color: '#fff',
                            fontWeight: 500,
                            fontFamily: 'Sailec, sans-serif'
                        },
                    },
                }}
                position="bottom-left"
                reverseOrder={false}
            />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
