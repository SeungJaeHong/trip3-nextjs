import React, {useState} from "react"
import { useRouter } from 'next/router'
import clsx from "clsx"
import styles from "./LoginPopupMenu.module.scss"
import {useAppDispatch, useAppSelector} from "../../hooks"
import {logout, selectUser} from "../../redux/auth"
import UserAvatar from "../User/UserAvatar"

type Props = {
    darkMode: boolean
}

const LoginPopupMenu = (props: Props) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const [open, setOpen] = useState(false)

    const onMenuItemClick = (href: string) => {
        router.push(href)
        setOpen(false)
    }

    const onLogoutClick = () => {
        dispatch(logout())
        setOpen(false)
    }

    const renderTitle = () => {
        if (user && user?.id) {
            return (
                <div className={styles.UserAvatar}>
                    <UserAvatar user={user} borderWidth={2} />
                </div>
            )
        } else {
            return (
                <span className={styles.LinkTitle}>
                    Minu Trip.ee
                </span>
            )
        }
    }

    const getLinks = () => {
        let links = []
        if (user) {
            links.push(
                {
                    title: 'Profiil',
                    route: '/user/' + user.id
                },
                {
                    title: 'Muuda profiili',
                    route: '/user/' + user.id + '/edit'
                },
                {
                    title: 'Sõnumid',
                    route: '/user/messages'
                },
                {
                    title: 'Toimetus',
                    route: '/internal'
                },
            )
        } else {
            links.push(
                {
                    title: 'Logi sisse',
                    route: '/login'
                },
                {
                    title: 'Registreeri',
                    route: '/register'
                }
            )
        }

        return links
    }

    return (
        <div className={clsx(styles.LoginPopupMenu, {
            [styles.Dark]: props.darkMode
        })} onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            {renderTitle()}
            <div className={clsx(styles.PopUpMenu, {
                [styles.Open]: open
            })} onMouseLeave={() => setOpen(false)}>
                <div className={styles.ArrowWrapper}>
                    <div className={styles.Arrow} />
                </div>
                <div className={styles.Links}>
                    {getLinks().map(link => {
                        return (
                            <div className={styles.LinkWrapper} onClick={() => onMenuItemClick(link.route)} key={link.route}>
                                <span className={styles.Link}>{link.title}</span>
                            </div>
                        )
                    })}

                    {user &&
                        <div className={styles.LinkWrapper} onClick={onLogoutClick}>
                            <span className={styles.Link}>Logi välja</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default LoginPopupMenu