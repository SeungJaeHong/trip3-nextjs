import Link from 'next/link'
import TripLogoDark from "../../icons/TripDarkLogo"
import SearchIcon from "../../icons/SearchIcon"
import TripLogo from "../../icons/TripLogo"
import styles from './Navbar.module.scss'
import clsx from "clsx"
import MenuIcon from "../../icons/MenuIcon"
import {useState} from "react"
import CloseIcon from "../../icons/CloseIcon"
import LoginPopupMenu from "../LoginPopupMenu"
import React from 'react'
import {useAppDispatch, useAppSelector} from "../../hooks"
import {logout, selectUser, selectUserIsLoggedIn} from "../../redux/auth"
import {LoggedInUser} from "../../types"

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
}

const Navbar = (props: Props) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const userIsLoggedIn = useAppSelector(selectUserIsLoggedIn)
    const [menuOpen, setMenuOpen] = useState(false)
    const onLogoutClick = () => {
        dispatch(logout())
    }

    const loginLink = (user: LoggedInUser) => {
        if (!userIsLoggedIn) {
            return (
                <LoginPopupMenu darkMode={props.darkMode} />
            )
        }

        return null
    }

    const getLogo = () => {
        return props.darkMode
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

    return (
        <div className={clsx(styles.Navbar, {
            [styles.Dark]: props.darkMode
        })}>
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
                {userIsLoggedIn && <a onClick={onLogoutClick}>Logi välja</a>}
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
    showSearch: false
}

export default Navbar