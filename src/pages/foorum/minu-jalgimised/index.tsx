import React from 'react'
import { GetServerSideProps } from 'next'
import { ForumRowType } from '../../../types'
import ForumIndexPage from '../../../components/Forum/ForumIndexPage'
import ApiClientSSR from '../../../lib/ApiClientSSR'

type Props = {
    forumPosts: ForumRowType[]
    currentPage: number
    topic?: string
    destination?: string
    hasMore: boolean
}

const FollowsForumIndex = (props: Props) => {
    return (
        <ForumIndexPage
            type={'follows'}
            title={'Minu jälgimised'}
            description={'Postitused, mida Sa oled jälgitavaks märkinud.'}
            searchPlaceholder={'Otsi vaba teema foorumist...'}
            {...props}
        />
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = context.query?.page
    try {
        let url = process.env.API_BASE_URL + '/forum/follows'
        if (page) {
            url += '?page=' + page
        }

        const res = await ApiClientSSR(context).get(url)
        return {
            props: {
                forumPosts: res.data.forumList?.items || [],
                hasMore: res.data.forumList?.hasMore || false,
                currentPage: page && typeof page === 'string' ? parseInt(page) : 1,
            }
        }
    } catch (e: any) {
        if (e.response?.status === 401 || e.response?.status === 419) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        } else {
            return {
                notFound: true,
            }
        }
    }
}

export default FollowsForumIndex
