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
    images: {
        domains: ['images.pexels.com'], //just for testing
    },
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
        SESSION_AUTH_URL: process.env.SESSION_AUTH_URL,
    },
}