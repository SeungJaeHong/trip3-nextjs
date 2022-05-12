import React, { useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'

export function GoogleAnalytics() {
    const _gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string
    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (!_gaId || window.gtag === undefined) {
                return
            }

            gtag('config', _gaId, {
                page_path: url,
            })
        }

        if (router.isReady) {
            handleRouteChange(router.asPath)
        }

        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    if (!_gaId) {
        return null
    }

    return (
        <>
            <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${_gaId}`} />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${_gaId}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    )
}
