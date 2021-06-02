import UserIcon from '../../icons/UserIcon'
import Link from 'next/link'
import {Fragment} from 'react'

const ForumComment = (comment: any) => {
    return (
        <Fragment>
            <div className="grid gap-4 p-6 border-2 border-gray-200 rounded-sm">
                <div className="flex flex-col items-start gap-3 md:items-center md:flex-row">
                    <UserIcon className="w-8 h-8 text-gray-200 fill-current" />
                    <Link href={'/foorum/uldfoorum/' + comment.content_id}>
                        <a className="text-sm font-medium text-cyan-500">
                            { comment.user?.name }
                        </a>
                    </Link>
                    <div className="text-sm font-medium text-gray-300">
                        {new Date(comment.created_at).toDateString()}
                    </div>
                    <button className="text-sm font-medium text-green-500">
                        Edit
                    </button>
                </div>
                <div className="prose prose-blue max-w-none">
                    {comment.body}
                </div>
            </div>
        </Fragment>
    )
}

export default ForumComment