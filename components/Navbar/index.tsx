import Link from 'next/link'
import TripLogoDark from "../../icons/TripDarkLogo"
import SearchIcon from "../../icons/SearchIcon"
import {useAuth} from "../../context/AuthContext"
import TripLogo from "../../icons/TripLogo"
import styles from './Navbar.module.scss'
import clsx from "clsx"
import MenuIcon from "../../icons/MenuIcon"
import {useState} from "react"
import CloseIcon from "../../icons/CloseIcon"

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
    {
        title: 'Reisipakkumised',
        route: '/'
    },
];

type Props = {
    darkMode?: boolean
    showSearch?: boolean
}

const Index = (props: Props) => {
    const {user, logout} = useAuth()
    const [menuOpen, setMenuOpen] = useState(false)
    const onLogoutClick = () => {
        logout()
        //show notification
    }

    //todo: const textColorCss = props.darkMode ? 'text-blue-400' : 'text-white'
    const loginLink = (user: any) => {
        if (!user) {
            return (
                <Link href={'/login'}>
                    <a>Logi sisse</a>
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

    const showMobileMenu = () => {
        if (menuOpen) {
            return (
                <div className={styles.MobileMenu}>
                    <div className={styles.CloseIcon} onClick={() => setMenuOpen(false)}>
                        <CloseIcon />
                    </div>
                    <div className={clsx([styles.Links, styles.LinksMobile])}>
                        {links.map(link => {
                            return (
                                <Link href={link.route} key={link.title}>
                                    <a>{link.title}</a>
                                </Link>
                            )
                        })}
                        {loginLink(user)}
                        {user && <a onClick={onLogoutClick}>Logi välja</a>}
                    </div>
                </div>
            )
        }

        return null;
    }

    return (
        <div className={styles.Navbar}>
            <div className={styles.Logo}>
                <Link href="/">
                    <a>
                        {getLogo()}
                    </a>
                </Link>
            </div>
            <div className={styles.Links}>
                {props.showSearch && <SearchIcon />}
                {links.map(link => {
                    return (
                        <Link href={link.route} key={link.title}>
                            <a>{link.title}</a>
                        </Link>
                    )
                })}
                {loginLink(user)}
                {user && <a onClick={onLogoutClick}>Logi välja</a>}
            </div>
            <div className={styles.MenuIcon} onClick={() => setMenuOpen(true)}>
                <MenuIcon />
            </div>
            {showMobileMenu()}
        </div>
    )
}

Index.defaultProps = {
    darkMode: false,
    showSearch: false
}

export default Index