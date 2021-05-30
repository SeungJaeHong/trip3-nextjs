import axios from 'axios'
import ForumRow from '../../../components/Forum/ForumRow'
import {GetServerSideProps} from "next"
import Link from 'next/link'

const MainForumIndex = (props: any) => {
    const posts = props?.content?.data || []
    const currentPage = props?.content?.current_page || 1
    const prevPage = currentPage > 1 ? currentPage - 1 : null
    const nextPage = currentPage + 1
    const nextPageUrl = props?.content?.next_page_url ? '/foorum/uldfoorum?page=' + nextPage : null
    const prevPageUrl = props?.content?.prev_page_url ? '/foorum/uldfoorum?page=' + prevPage : null

    return (
        <div className="p-6 pt-12 lg:container lg:mx-auto bg-gray-50">
            <div className="grid gap-8">
                {posts.map((post: any) => {
                    return <ForumRow {...post} key={post.id}/>
                })}
            </div>
            <div className="flex justify-center gap-4 pt-16 pb-12">
                {prevPageUrl &&
                <Link href={prevPageUrl}>
                    <a className="px-6 py-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 active:bg-green-600">
                        Prev
                    </a>
                </Link>
                }

                {nextPageUrl &&
                <Link href={nextPageUrl}>
                    <a className="px-6 py-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 active:bg-green-600">
                        Next
                    </a>
                </Link>
                }
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = context.query?.page
    let url = process.env.API_BASE_URL + '/forum'
    if (page) {
        url += '?page=' + page
    }

    const response = await axios.get(url)
    return {
        props: {
            content: response.data,
        }
    }
}

MainForumIndex.title = 'Foorum'

export default MainForumIndex