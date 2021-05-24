import axios from 'axios'
import ForumRow from "../../../components/Forum/ForumRow";

const MainForumIndex = (props: any) => {
    const posts = props?.content?.data || []

    return (
        <div className="p-6 pt-12 lg:container lg:mx-auto bg-gray-50">
            <div className="grid gap-8">
                {posts.map((post: any) => {
                    return <ForumRow {...post} key={post.id}/>
                })}
            </div>
        </div>
    )
}

export const getServerSideProps = async () => {
    const url = process.env.LARAVEL_API_URL + '/forum'
    const response = await axios.get(url)

    return {
        props: {
            content: response.data
        }
    }
}

MainForumIndex.title = 'Üldfoorum'

export default MainForumIndex