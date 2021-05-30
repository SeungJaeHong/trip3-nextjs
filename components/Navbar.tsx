import Link from 'next/link'
import TripLogoDark from "./icons/TripDarkLogo"
import SearchIcon from "./icons/SearchIcon"
import {useAuth} from "../context/AuthContext"

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

const loginLink = (user: any) => {
   if (!user) {
       return (
           <Link href={'/login'}>
               <a className="font-medium text-gray-500 text-md">Logi sisse</a>
           </Link>
       )
   }

   return null
}

const Navbar = () => {
    const {user, logout} = useAuth()
    const onLogoutClick = () => {
        logout()
        //show notification
    }

    return (
        <div className="relative flex justify-between h-6 items-center">
            <div className="mt-4">
                <Link href="/">
                    <a>
                        <TripLogoDark width={200} heigth={150}/>
                    </a>
                </Link>
            </div>
            <div className="items-center hidden space-x-4 lg:flex">
                <SearchIcon className="w-5 h-5 fill-current text-gray-500"/>
                {links.map(link => {
                    return (
                        <Link href={link.route} key={link.title}>
                            <a className="font-medium text-gray-500 text-md">{link.title}</a>
                        </Link>
                    )
                })}
                {loginLink(user)}
                {user && <a className="font-medium text-gray-500 text-md cursor-pointer" onClick={onLogoutClick}>Logi välja</a>}
            </div>
        </div>
    )
}

export default Navbar