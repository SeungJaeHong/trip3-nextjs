import Link from 'next/link'
import TripLogoDark from "./icons/TripDarkLogo"
import SearchIcon from "./icons/SearchIcon"
import {useAuth} from "../context/AuthContext"
import TripLogo from "./icons/TripLogo"

const links = [
    {
        title: 'Lennupakkumised',
        route: '/lennupakkumised'
    },
    {
        title: 'Reisikaaslased',
        route: '/reisikaaslased'
    },
    {
        title: 'Foorum',
        route: '/foorum/uldfoorum'
    },
    {
        title: 'Uudised',
        route: '/uudised'
    },
];

type Props = {
    darkMode?: boolean
    showSearch?: boolean
}

const Navbar = (props: Props) => {
    const {user, logout} = useAuth()
    const onLogoutClick = () => {
        logout()
        //show notification
    }

    const textColorCss = props.darkMode ? 'text-blue-400' : 'text-white'
    const loginLink = (user: any) => {
        if (!user) {
            return (
                <Link href={'/login'}>
                    <a className={"font-medium text-md " + textColorCss}>Logi sisse</a>
                </Link>
            )
        }

        return null
    }

    const getLogo = () => {
        return props.darkMode
            ? <TripLogoDark width={200} heigth={150} />
            : <TripLogo width={200} heigth={150} />
    }

    return (
        <div className="relative flex justify-between h-6 items-center">
            <div className="mt-4">
                <Link href="/">
                    <a>
                        {getLogo()}
                    </a>
                </Link>
            </div>
            <div className="items-center hidden space-x-4 lg:flex">
                {props.showSearch && <SearchIcon className={"w-5 h-5 fill-current " + textColorCss} />}
                {links.map(link => {
                    return (
                        <Link href={link.route} key={link.title}>
                            <a className={"font-medium text-md " + textColorCss}>{link.title}</a>
                        </Link>
                    )
                })}
                {loginLink(user)}
                {user && <a className={"font-medium text-md cursor-pointer " + textColorCss} onClick={onLogoutClick}>Logi välja</a>}
            </div>
        </div>
    )
}

Navbar.defaultProps = {
    darkMode: false,
    showSearch: false
}

export default Navbar