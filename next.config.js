const path = require('path')

module.exports = {
    async redirects() {
        return [
            {
                source: '/foorum',
                destination: '/foorum/uldfoorum',
                permanent: false,
            },
        ]
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        domains: ['trip.ee', 'images.pexels.com'], //just for testing
    },
    env: {
        APP_URL: process.env.APP_URL,
        API_BASE_URL: process.env.API_BASE_URL,
        FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    },
    experimental: {
        scrollRestoration: true,
    },
}