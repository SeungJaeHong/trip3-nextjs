import React from 'react'
import { GetServerSideProps } from 'next'
import { ForumRowType } from '../../../types'
import ForumIndexPage from '../../../components/Forum/ForumIndexPage'
import ApiClientSSR from '../../../lib/ApiClientSSR'
import { objectToQueryString } from '../../../helpers'
import { NextSeo } from 'next-seo'

type Props = {
    forumPosts: ForumRowType[]
    currentPage: number
    search?: string
    topic?: string
    destination?: string
    hasMore: boolean
    total: number
    destinationOptions: { value: string; label: string }[]
    topicOptions: { value: string; label: string }[]
}

const ForeignForumIndex = (props: Props) => {
    return (
        <>
            <NextSeo
                title={'Trip.ee | Elu välismaal'}
                description={'Soovitused välismaal elavatelt eestlastelt'}
                openGraph={{
                    title: 'Elu välismaal',
                    description: 'Soovitused välismaal elavatelt eestlastelt',
                }}
            />
            <ForumIndexPage
                type={'foreign'}
                title={'Elu välismaal'}
                description={'Soovitused välismaal elavatelt eestlastelt.'}
                searchPlaceholder={'Otsi elu välismaal foorumist...'}
                {...props}
            />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const q = context.query?.q
    const destination = context.query?.destination
    const topic = context.query?.topic
    const page = context.query?.page
    let url = process.env.API_BASE_URL + '/forum/foreign'
    const urlParams = {
        q: q,
        topic: topic,
        destination: destination,
        page: page,
    }

    const queryString = objectToQueryString(urlParams)
    url += '?' + queryString

    const res = await ApiClientSSR(context).get(url)
    const destinationOptions: { value: string; label: string }[] = res.data?.destinations.map((destination: any) => ({
        label: destination.name,
        value: destination.id.toString(),
    }))
    const topicOptions: { value: string; label: string }[] = res.data?.topics.map((topic: any) => ({
        label: topic.name,
        value: topic.id.toString(),
    }))
    return {
        props: {
            forumPosts: res.data?.items || [],
            hasMore: res.data?.hasMore || false,
            total: res.data.total,
            currentPage: page && typeof page === 'string' ? parseInt(page) : 1,
            search: q || '',
            destination: destination || null,
            topic: topic || null,
            destinationOptions: destinationOptions || [],
            topicOptions: topicOptions || [],
        },
    }
}

export default ForeignForumIndex
