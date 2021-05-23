import Link from 'next/link'

const ForumRow = (props: any) => {
    return (
        <div className="grid grid-cols-[auto,1fr] gap-4">
            <div className="overflow-hidden text-gray-200 transform -translate-y-1 rounded-full w-14 h-14">
                Icon
            </div>
            <Link href={'/'}>
                <a className="grid gap-4 auto-rows-min">
                    <h3 className="text-xl font-bold text-gray-700">{props.title}</h3>
                    <div className="flex flex-col space-y-3  md:space-x-3 md:space-y-0 md:items-center md:flex-row">
                        <div className="text-base text-gray-500">Posititas</div>
                        <div className="text-base font-medium text-cyan-500">
                            {props.user.name}
                        </div>
                        <div className="text-base text-gray-500">
                            {props.created_at}
                        </div>
                        <div className="text-base text-gray-500">
                            {props.comments.length || 0} kommentaari
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default ForumRow