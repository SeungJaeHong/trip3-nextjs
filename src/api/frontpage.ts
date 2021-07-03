import ApiClient from '../lib/ApiClient'

//todo: move under news api later
export const getNewsData = async () => {
    const news = await ApiClient.get('/frontpage/news')
    return news
}