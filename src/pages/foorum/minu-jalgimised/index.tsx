import React from 'react'
import axios from 'axios'
import {GetServerSideProps} from "next"
import {ForumRowType} from "../../../types"
import ForumIndexPage from "../../../components/Forum/ForumIndexPage"

type Props = {
    forumPosts: ForumRowType[],
    currentPage: number,
    topic?: number,
    destination?: number,
    hasMore: boolean,
}

const FollowsForumIndex = (props: Props) => {
    return <ForumIndexPage
        type={'follows'}
        title={'Minu jälgimised'}
        description={'Postitused, mida Sa oled jälgitavaks märkinud.'}
        searchPlaceholder={'Otsi vaba teema foorumist...'}
        {...props} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = context.query?.page
    const destination = context.query?.destination
    const topic = context.query?.topic
    let url = process.env.API_BASE_URL + '/forum/follows'
    if (page) {
        url += '?page=' + page
    }

    const data = {
        user: null,
        forumPosts: [],
        currentPage: page && typeof page === 'string' ? parseInt(page) : 1,
        hasMore: false,
    }

    const res = await axios.get(url)
    data.user = res.data.user
    data.forumPosts = res.data.forumList?.items
    data.hasMore = res.data.forumList?.hasMore

    return {
        props: data
    }
}

export default FollowsForumIndex