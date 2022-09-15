import React from 'react'
import { GetServerSideProps } from 'next'
import { Feed } from 'feed'
import { NewsCardType } from '../../../types'
import { getLatestNews } from '../../../services/news.service'

const hostUrl = process.env.APP_URL as string

const buildFeed = (items: NewsCardType[]) => {
    const feed = new Feed({
        id: hostUrl,
        link: hostUrl,
        title: 'Trip.ee | Uudised',
        description: 'Uudised reisimisest, reisi- ja lennufirmadest, viisadest ja muust parasjagu aktuaalsest',
        copyright: `Copyright © 1998 - ${new Date().getFullYear()} Trip.ee`,
        updated: new Date(items[0].createdAtRaw),
    })

    items.forEach((item) => {
        feed.addItem({
            title: item.title,
            link: `${hostUrl}/uudised/${item.slug}`,
            date: new Date(item.createdAtRaw),
            image: item.imageUrl,
        })
    })

    return feed
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context && context.res) {
        const { res } = context
        const news = await getLatestNews(15)
        const feed = buildFeed(news.data)

        res.setHeader('content-type', 'text/xml')
        res.write(feed.rss2())
        res.end()
    }

    return {
        props: {},
    }
}

const NewsRss = () => null

export default NewsRss
