import Link from 'next/link'
import UserIcon from '../icons/UserIcon'

const ForumRow = (props: any) => {
    return (
        <div className="grid grid-cols-[auto,1fr] gap-4">
            <div className="overflow-hidden text-gray-200 transform -translate-y-1 rounded-full w-14 h-14">
                <UserIcon />
            </div>
            <Link href={'/foorum/uldfoorum/' + props.id}>
                <a className="grid gap-1 auto-rows-min">
                    <h3 className="text-xl font-bold text-gray-700">{props.title}</h3>
                    <div className="flex flex-col space-y-3 md:space-x-3 md:space-y-0 md:items-center md:flex-row">
                        <div className="text-base text-gray-500">Posititas</div>
                        <div className="text-base font-medium text-cyan-500">
                            {props.user.name}
                        </div>
                        <div className="text-base text-gray-500">
                            {new Date(props.created_at).toDateString()}
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