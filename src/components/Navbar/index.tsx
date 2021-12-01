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
import {toast} from "react-hot-toast"

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
    const { loading, loggedIn, user, mutate } = useUser()
    const [menuOpen, setMenuOpen] = useState(false)
    const onLogoutClick = async () => {
        try {
            const res = await logout().then((response) => {
                mutate(undefined)
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
        if (loggedIn) {
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
                            <a>{link.title}</a>
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