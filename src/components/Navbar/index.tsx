import Link from 'next/link'
import TripLogoDark from '../../icons/TripDarkLogo'
import SearchIcon from '../../icons/SearchIcon'
import TripLogo from '../../icons/TripLogo'
import styles from './Navbar.module.scss'
import clsx from 'clsx'
import MenuIcon from '../../icons/MenuIcon'
import { useState } from 'react'
import CloseIcon from '../../icons/CloseIcon'
import UserNavBarMenu from '../UserNavbarMenu'
import React from 'react'
import { useUnreadMessageCount, useUser } from '../../hooks'
import { logout } from '../../services/auth.service'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import UserAvatar from '../User/UserAvatar'

const mainLinks = [
    {
        title: 'Lennupakkumised',
        route: '/odavad-lennupiletid',
    },
    {
        title: 'Reisikaaslased',
        route: '/reisikaaslased',
    },
    {
        title: 'Foorum',
        route: '/foorum/uldfoorum',
    },
    {
        title: 'Uudised',
        route: '/uudised',
    },
]

type Props = {
    darkMode: boolean
    showSearch?: boolean
    showLogo?: boolean
}

const Navbar = ({ darkMode, showSearch, showLogo }: Props) => {
    const { user, userIsLoggedIn, mutate } = useUser()
    const { unreadMessageCount } = useUnreadMessageCount()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const [menuOpen, setMenuOpen] = useState(false)
    const router = useRouter()

    const onLogoutClick = async () => {
        try {
            await logout().then((response) => {
                mutate(undefined)
                router.push('/')
                setMenuOpen(false)
            })
        } catch (e: any) {
            toast.error('Väljalogimine ebaõnnestus')
        }
    }

    const onMobileLinkClick = (route: string) => {
        router.push(route)
        setMenuOpen(false)
    }

    const getLogo = () => {
        return darkMode ? <TripLogoDark width={200} heigth={150} /> : <TripLogo width={200} heigth={150} />
    }

    const mobileMenuUserLinks = () => {
        if (userIsLoggedIn) {
            return <a onClick={onLogoutClick}>Logi välja</a>
        } else {
            return (
                <React.Fragment>
                    <div className={styles.MobileLink} onClick={() => onMobileLinkClick('/login')}>
                        <div className={styles.LinkTitle}>{'Logi sisse'}</div>
                    </div>
                    <div className={styles.MobileLink} onClick={() => onMobileLinkClick('/register')}>
                        <div className={styles.LinkTitle}>{'Registreeri'}</div>
                    </div>
                </React.Fragment>
            )
        }
    }

    const renderMobileMenuLink = (link: { title: string; route: string }) => {
        if (userIsLoggedIn && user !== undefined && link.route === '/profile/messages' && unreadMessageCount) {
            return (
                <div className={styles.LinkTitle}>
                    {link.title}
                    {unreadMessageCount > 0 && <span>{unreadMessageCount}</span>}
                </div>
            )
        } else {
            return <div className={styles.LinkTitle}>{link.title}</div>
        }
    }

    const showMobileMenu = () => {
        if (menuOpen) {
            let loggedInLinks: Array<{ title: string; route: string }> = []
            if (userIsLoggedIn && user) {
                loggedInLinks = [
                    {
                        title: 'Minu profiil',
                        route: '/user/' + user.id,
                    },
                    {
                        title: 'Muuda profiili',
                        route: '/user/' + user.id + '/edit',
                    },
                    {
                        title: 'Sõnumid',
                        route: '/profile/messages',
                    },
                ]
            }

            if (userIsAdmin) {
                loggedInLinks.push({
                    title: 'Toimetus',
                    route: '/admin/forum',
                })
            }

            let mobileLinks = [
                {
                    title: 'Trip.ee',
                    route: '/',
                },
                ...mainLinks,
                ...loggedInLinks,
            ]

            return (
                <div className={styles.MobileMenu}>
                    <div className={styles.MenuContainer}>
                        <div className={styles.CloseIcon} onClick={() => setMenuOpen(false)}>
                            <CloseIcon />
                        </div>
                        <div className={clsx([styles.Links, styles.LinksMobile])}>
                            <div className={styles.DefaultLinks}>
                                {mobileLinks.map((link) => {
                                    return (
                                        <div
                                            className={styles.MobileLink}
                                            key={link.title}
                                            onClick={() => onMobileLinkClick(link.route)}
                                        >
                                            {renderMobileMenuLink(link)}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.AuthLinks}>
                                {mobileMenuUserLinks()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return null
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

    const renderMobileMenuIcon = () => {
        if (userIsLoggedIn && user) {
            return (
                <div className={styles.UserIcon}>
                    <UserAvatar user={user} borderWidth={2} />
                    {unreadMessageCount !== undefined && unreadMessageCount > 0 && (
                        <span className={styles.UnreadMessageCount}>{unreadMessageCount}</span>
                    )}
                </div>
            )
        } else {
            return (
                <div className={styles.Hamburger}>
                    <MenuIcon />
                </div>
            )
        }
    }

    return (
        <div
            className={clsx(styles.Navbar, {
                [styles.Dark]: darkMode,
            })}
        >
            {showLogo && (
                <div className={styles.Logo}>
                    <Link href="/">
                        <a>{getLogo()}</a>
                    </Link>
                </div>
            )}
            <div className={styles.Links}>
                {showSearch && <SearchIcon />}
                {mainLinks.map((link) => {
                    return (
                        <Link href={link.route} key={link.title}>
                            <a
                                className={clsx({
                                    [styles.ActiveLink]: linkIsActive(link.route),
                                })}
                            >
                                {link.title}
                            </a>
                        </Link>
                    )
                })}

                <div className={styles.UserAvatar}>
                    <UserNavBarMenu darkMode={darkMode} unreadMessageCount={unreadMessageCount} />
                </div>
            </div>
            <div className={styles.MenuIcon} onClick={() => setMenuOpen(true)}>
                {renderMobileMenuIcon()}
            </div>
            {showMobileMenu()}
        </div>
    )
}

Navbar.defaultProps = {
    darkMode: false,
    showSearch: false,
    showLogo: true,
}

export default Navbar
