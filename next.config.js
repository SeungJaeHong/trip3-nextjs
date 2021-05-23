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
}