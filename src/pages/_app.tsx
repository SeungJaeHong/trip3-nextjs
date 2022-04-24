import type { AppProps } from 'next/app'
import NextNprogress from 'nextjs-progressbar'
import '../styles/globals.scss'
import 'keen-slider/keen-slider.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Script from 'next/script'
import AdsConfig from '../lib/AdsConfig'
import Head from 'next/head'

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
                position="top-right"
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
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <title>Trip.ee | Eesti reisiportaal</title>
            </Head>
            <Component {...pageProps} />
            <Script
                id={'ads-js'}
                src={'https://securepubads.g.doubleclick.net/tag/js/gpt.js'}
                onLoad={() => {
                    window.googletag = window.googletag || { cmd: [] }
                    googletag.cmd.push(function () {
                        AdsConfig.map((ad) => {
                            googletag
                                .defineSlot(ad.slotId, [[ad.width, ad.height], 'fluid'], ad.divId)
                                ?.addService(googletag.pubads())
                        })
                        googletag.pubads().disableInitialLoad()
                        googletag.pubads().enableSingleRequest()
                        googletag.pubads().collapseEmptyDivs()
                        googletag.enableServices()
                    })
                }}
            />
        </>
    )
}

export default MyApp
