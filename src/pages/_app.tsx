import type { AppProps } from 'next/app'
import NextNprogress from 'nextjs-progressbar'
import '../styles/globals.scss'
import 'keen-slider/keen-slider.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
//import { GoogleAnalytics } from '../components/GoogleAnalytics'
import { DefaultSeo } from 'next-seo'
import '../styles/leaflet_map.scss'
import ErrorPage503 from './503'
import MainLayout from '../layouts/MainLayout'
import Head from 'next/head'
import { Hotjar } from '../components/Hotjar'
import React, { useEffect } from 'react'
import { pageView } from '../lib/Gtm'
import { useRouter } from 'next/router'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
    const maintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE as string
    const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string
    const router = useRouter()

    useEffect(() => {
        router.events.on('routeChangeComplete', pageView)
        return () => {
            router.events.off('routeChangeComplete', pageView)
        }
    }, [router.events])

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
            <Head>
                <script async src={'https://securepubads.g.doubleclick.net/tag/js/gpt.js'} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.googletag = window.googletag || {cmd: []};
                    googletag.cmd.push(function () {
                        googletag.enableServices();
                    })`,
                    }}
                />
                <title>{'Trip.ee | Eesti reisiportaal'}</title>
            </Head>
            <Hotjar />
            <Script
                id="gtag-base"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${gtmId}');
          `,
                }}
            />
            {/*<GoogleAnalytics />*/}
            <MainLayout>{maintenance === 'true' ? <ErrorPage503 /> : <Component {...pageProps} />}</MainLayout>
            {/*<Script
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

                        console.log('gpt loaded', window.googletag)
                    })
                }}
            />*/}
        </>
    )
}

export default MyApp
