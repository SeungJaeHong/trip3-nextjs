export const pageView = (url: string) => {
    // @ts-ignore
    window.dataLayer.push({
        event: 'pageview',
        page: url,
    })
}