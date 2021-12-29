const path = require('path')

module.exports = {
    async redirects() {
        return [
            {
                source: '/foorum',
                destination: '/foorum/uldfoorum',
                permanent: false,
            },
            {
                source: '/admin',
                destination: '/admin/dashboard',
                permanent: false,
            },
        ]
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        domains: [
            'trip3spaces.fra1.cdn.digitaloceanspaces.com'
        ],
    },
    env: {
        APP_URL: process.env.APP_URL,
        API_BASE_URL: process.env.API_BASE_URL,
        FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        IMAGE_URL: process.env.IMAGE_URL,
        LIGHTGALLERY_KEY: process.env.LIGHTGALLERY_KEY
    },
    experimental: {
        scrollRestoration: true,
    },
}