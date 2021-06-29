import ApiClient from '../lib/ApiClient'

export const getNewsData = async () => {
    const news = await ApiClient.get('/frontpage/news')
    return news
}