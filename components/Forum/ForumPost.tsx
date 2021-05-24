import UserIcon from '../icons/UserIcon'

const ForumPost = (props: any) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-x-8">
            <div className="w-14">
                <UserIcon className="text-gray-200 w-14 h-14 fill-current"/>
            </div>
            <div className="grid gap-4">
                <h1 className="text-3xl font-bold tracking-tight text-color-500">
                    {props.title}
                </h1>
                <div className="prose lg:prose-lg max-w-none prose-blue">
                    {props.body}
                </div>
            </div>
        </div>
    )
}

export default ForumPost