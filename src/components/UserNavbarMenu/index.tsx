import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import styles from './UserNavBarMenu.module.scss'
import UserAvatar from '../User/UserAvatar'
import { toast } from 'react-toastify'
import { useUser } from '../../hooks'
import { logout } from '../../services/auth.service'

type Props = {
    darkMode: boolean
    unreadMessageCount?: number
}

const UserNavBarMenu = ({ darkMode, unreadMessageCount }: Props) => {
    const router = useRouter()
    const { userIsLoggedIn, user, mutate } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const [menuOpen, setMenuOpen] = useState(false)
    const ref = useRef<any>()

    const onMenuItemClick = (href: string) => {
        router.push(href)
        setMenuOpen(false)
    }

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            if (menuOpen && ref.current && !ref.current.contains(e.target)) {
                setMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', checkIfClickedOutside)

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside)
        }
    }, [menuOpen])

    const onLogoutClick = async () => {
        try {
            setMenuOpen(false)
            await logout().then((response) => {
                mutate(undefined)
                router.push('/')
                toast.success('Väljalogimine õnnestus!')
            })
        } catch (e: any) {
            setMenuOpen(false)
            toast.error('Väljalogimine ebaõnnestus')
        }
    }

    const renderTitle = () => {
        if (userIsLoggedIn && user !== undefined) {
            return (
                <div className={styles.UserAvatar}>
                    <UserAvatar user={user} borderWidth={2} />
                    {unreadMessageCount && unreadMessageCount > 0 && (
                        <span className={styles.UnreadMessageCount}>{unreadMessageCount}</span>
                    )}
                </div>
            )
        } else {
            return <span className={styles.LinkTitle}>Minu Trip.ee</span>
        }
    }

    const getLinks = () => {
        let links = []
        if (userIsLoggedIn && user) {
            links.push(
                {
                    title: 'Profiil',
                    route: '/user/' + user.id,
                },
                {
                    title: 'Muuda profiili',
                    route: '/user/' + user.id + '/edit',
                },
                {
                    title: 'Sõnumid',
                    route: '/profile/messages',
                }
            )

            if (userIsAdmin) {
                links.push({
                    title: 'Toimetus',
                    route: '/admin/dashboard',
                })
            }
        } else {
            links.push(
                {
                    title: 'Logi sisse',
                    route: '/login',
                },
                {
                    title: 'Registreeri',
                    route: '/register',
                }
            )
        }

        return links
    }

    const renderMenuLink = (link: { title: string; route: string }) => {
        if (userIsLoggedIn && user !== undefined && link.route === '/profile/messages' && unreadMessageCount) {
            return (
                <div className={styles.Link}>
                    {link.title}
                    <span>{unreadMessageCount}</span>
                </div>
            )
        } else {
            return <div className={styles.Link}>{link.title}</div>
        }
    }

    return (
        <div
            className={clsx(styles.UserNavBarMenu, {
                [styles.Dark]: darkMode,
            })}
            onClick={() => setMenuOpen(!menuOpen)}
            ref={ref}
        >
            {renderTitle()}
            <div
                className={clsx(styles.Menu, {
                    [styles.Open]: menuOpen,
                    [styles.WithAvatar]: user !== null,
                })}
            >
                <div className={styles.ArrowWrapper}>
                    <div className={styles.Arrow} />
                </div>
                <div className={styles.Links}>
                    {getLinks().map((link) => {
                        return (
                            <div
                                className={styles.LinkWrapper}
                                onClick={() => onMenuItemClick(link.route)}
                                key={link.route}
                            >
                                {renderMenuLink(link)}
                            </div>
                        )
                    })}

                    {userIsLoggedIn && (
                        <div className={styles.LinkWrapper} onClick={onLogoutClick}>
                            <span className={styles.Link}>Logi välja</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

UserNavBarMenu.defaultProps = {
    darkMode: false,
}

export default UserNavBarMenu
