import Link from 'next/link'
import TripLogoDark from "../../icons/TripDarkLogo"
import SearchIcon from "../../icons/SearchIcon"
import TripLogo from "../../icons/TripLogo"
import styles from './Navbar.module.scss'
import clsx from "clsx"
import MenuIcon from "../../icons/MenuIcon"
import {useState} from "react"
import CloseIcon from "../../icons/CloseIcon"
import UserNavBarMenu from "../UserNavbarMenu"
import React from 'react'
import useUser from "../../hooks"
import {logout} from "../../services/auth.service"
import {toast} from 'react-toastify'
import {useRouter} from "next/router"

const links = [
    {
        title: 'Lennupakkumised',
        route: '/odavad-lennupiletid'
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
    /*{
        title: 'Reisipakkumised',
        route: '/'
    },*/
];

type Props = {
    darkMode: boolean
    showSearch?: boolean
    showLogo?: boolean
}

const Navbar = ({darkMode, showSearch, showLogo}: Props) => {
    const { userIsLoggedIn, mutate } = useUser()
    const [menuOpen, setMenuOpen] = useState(false)
    const router = useRouter()

    const onLogoutClick = async () => {
        try {
            await logout().then((response) => {
                mutate(undefined)
                router.push('/')
            })
        } catch (e: any) {
            toast.error('Väljalogimine ebaõnnestus')
        }
    }

    const getLogo = () => {
        return darkMode
            ? <TripLogoDark width={200} heigth={150} />
            : <TripLogo width={200} heigth={150} />
    }

    const mobileMenuUserLinks = () => {
        if (userIsLoggedIn) {
            return <a onClick={onLogoutClick}>Logi välja</a>
        } else {
            return (
                <React.Fragment>
                    <Link href={'/login'}>
                        <a>Logi sisse</a>
                    </Link>
                    <Link href={'/registreeri'}>
                        <a>Registreeri</a>
                    </Link>
                </React.Fragment>
            )
        }
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
                        {mobileMenuUserLinks()}
                    </div>
                </div>
            )
        }

        return null;
    }

    const linkIsActive = (route: string): boolean => {
        if (route === '/foorum/uldfoorum') {
            const prefix = router.route.substring(0, 7)
            if (prefix === '/foorum') {
                return true
            }
        }

        if (route === '/odavad-lennupiletid') {
            const prefix = router.route.substring(0, 20)
            if (prefix === '/odavad-lennupiletid') {
                return true
            }
        }

        if (route === '/uudised') {
            const prefix = router.route.substring(0, 8)
            if (prefix === '/uudised') {
                return true
            }
        }

        if (route === '/reisikaaslased') {
            const prefix = router.route.substring(0, 15)
            if (prefix === '/reisikaaslased') {
                return true
            }
        }

        return router.route === route
    }

    return (
        <div className={clsx(styles.Navbar, {
            [styles.Dark]: darkMode
        })}>
            {showLogo &&
                <div className={styles.Logo}>
                    <Link href="/">
                        <a>
                            {getLogo()}
                        </a>
                    </Link>
                </div>
            }
            <div className={styles.Links}>
                {showSearch && <SearchIcon />}
                {links.map(link => {
                    return (
                        <Link href={link.route} key={link.title}>
                            <a className={clsx({
                                [styles.ActiveLink]: linkIsActive(link.route)
                            })}>{link.title}</a>
                        </Link>
                    )
                })}

                <div className={styles.UserAvatar}>
                    <UserNavBarMenu darkMode={darkMode} />
                </div>
            </div>
            <div className={styles.MenuIcon} onClick={() => setMenuOpen(true)}>
                <MenuIcon />
            </div>
            {showMobileMenu()}
        </div>
    )
}

Navbar.defaultProps = {
    darkMode: false,
    showSearch: false,
    showLogo: true
}

export default Navbar