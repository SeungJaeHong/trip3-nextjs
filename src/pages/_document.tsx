import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string
    return (
        <Html>
            <Head />
            <body>
            <noscript>
                {gtmId &&
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                }
            </noscript>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}