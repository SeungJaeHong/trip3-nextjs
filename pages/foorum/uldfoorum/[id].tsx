import React, {Fragment} from 'react'
import axios from 'axios'
import {GetServerSideProps} from 'next'
import Head from 'next/head'
import ForumPost from "../../../components/Forum/ForumPost"
import ForumComment from "../../../components/Forum/ForumComment"
import Header from "../../../components/Header"

const ForumShow = (props: any) => {
    return (
        <Fragment>
            <Head>
                <title>Üldfoorum</title>
                <meta name="description" content={props.content.title} />
            </Head>
            <Header title={'Üldfoorum'} />
            <div className="p-6 pt-20 lg:container lg:mx-auto bg-gray-50">
                <ForumPost {...props.content} />
            </div>
            <div className="p-6 pt-12 pb-24 lg:container lg:mx-auto grid grid-cols-1 md:grid-cols-[auto,1fr] gap-x-8">
                <div className="grid gap-4">
                    {props.content.comments.map((comment: any) => {
                        return <ForumComment {...comment} key={comment.id} />
                    })}
                </div>
            </div>
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id
    const url = process.env.API_BASE_URL + '/forum/' + id
    const response = await axios.get(url)

    return {
        props: {
            content: response.data
        }
    }
}

//ForumShow.title = 'Üldfoorum'

export default ForumShow