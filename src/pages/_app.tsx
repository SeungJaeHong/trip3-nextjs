import type { AppProps } from 'next/app'
import NextNprogress from 'nextjs-progressbar'
import '../styles/globals.scss'
import 'keen-slider/keen-slider.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Script from 'next/script'
import AdsConfig from '../lib/AdsConfig'
import { GoogleAnalytics } from '../components/GoogleAnalytics'
import { DefaultSeo } from 'next-seo'
import '../styles/leaflet_map.scss'
import ErrorPage503 from './503'

function MyApp({ Component, pageProps }: AppProps) {
    const maintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE as string
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
            <DefaultSeo
                dangerouslySetAllPagesToNoFollow={String(process.env.APP_URL) !== 'https://trip.ee'}
                dangerouslySetAllPagesToNoIndex={String(process.env.APP_URL) !== 'https://trip.ee'}
                title={'Trip.ee | Eesti reisiportaal'}
                description={
                    'Trip.ee koondab kokku kõik reisimiseks vajaliku: reisijate kogemused ja reisisoovitused, reisiideed, odavad piletid, reisikaaslaste otsingu ja reisivarustuse ost ja müük'
                }
                additionalMetaTags={[
                    {
                        name: 'keywords',
                        content: 'Reisifoorum, odavad lennupiletid, reisikaaslased, reisiuudised',
                    },
                ]}
                additionalLinkTags={[
                    {
                        rel: 'icon',
                        href: '/favicon.ico',
                    },
                    {
                        rel: 'apple-touch-icon',
                        href: '/favicons/apple-touch-icon-76x76.png',
                        sizes: '76x76',
                    },
                    {
                        rel: 'apple-touch-icon',
                        href: '/favicons/apple-touch-icon-180x180.png',
                        sizes: '180x180',
                    },
                    {
                        rel: 'icon',
                        type: 'image/png',
                        href: '/favicons/android-chrome-72x72.png',
                        sizes: '72x72',
                    },
                    {
                        rel: 'icon',
                        type: 'image/png',
                        href: '/favicons/android-chrome-192x192.png',
                        sizes: '192x192',
                    },
                ]}
                openGraph={{
                    type: 'website',
                    locale: 'et_EE',
                    site_name: 'trip.ee',
                    images: [
                        {
                            url: '/images/social.jpg',
                            width: 1200,
                            height: 627,
                            type: 'image/jpeg',
                        },
                    ],
                }}
                twitter={{
                    cardType: 'summary_large_image',
                }}
            />
            <GoogleAnalytics />
            {maintenance === 'true' ? <ErrorPage503 /> : <Component {...pageProps} />}
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
