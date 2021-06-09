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
        API_BASE_URL: process.env.API_BASE_URL,
        SESSION_AUTH_URL: process.env.SESSION_AUTH_URL,
    },
}