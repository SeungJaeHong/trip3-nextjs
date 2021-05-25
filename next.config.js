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
}