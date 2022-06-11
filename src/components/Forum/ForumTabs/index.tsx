import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './ForumTabs.module.scss'
import clsx from 'clsx'
import { useUser } from '../../../hooks'
import { useEffect, useRef } from 'react'

const ForumTabs = () => {
    const router = useRouter()
    const ref = useRef<HTMLDivElement>(null)
    const { userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const tabs = [
        {
            title: 'Üldfoorum',
            route: '/foorum/uldfoorum',
            active: router.pathname === '/foorum/uldfoorum',
        },
        {
            title: 'Ost-müük',
            route: '/foorum/ost-muuk',
            active: router.pathname === '/foorum/ost-muuk',
        },
        {
            title: 'Elu välismaal',
            route: '/foorum/elu-valismaal',
            active: router.pathname === '/foorum/elu-valismaal',
        },
        {
            title: 'Vaba teema',
            route: '/foorum/vaba-teema',
            active: router.pathname === '/foorum/vaba-teema',
        },
        {
            title: 'Minu jälgimised',
            route: '/foorum/minu-jalgimised',
            active: router.pathname === '/foorum/minu-jalgimised',
        },
        {
            title: 'Toimetus',
            route: '/admin/forum',
            active: false,
        },
    ]

    useEffect(() => {
        if (window.innerWidth <= 600) {
            const activeTab = tabs.filter((tab) => tab.active)
            if (activeTab && activeTab.length === 1 && ref?.current) {
                const tab = document.getElementById(activeTab[0].route)
                const pos = tab?.getBoundingClientRect()
                if (pos && ref?.current && pos.left >= 200) {
                    ref.current.scrollLeft = pos.left - pos.width / 2
                }
            }
        }
    }, [])

    return (
        <div className={styles.ForumTabs} ref={ref}>
            {tabs.map((tab) => {
                if (tab.route === '/foorum/minu-jalgimised' && !userIsLoggedIn) {
                    return null
                }

                if (tab.route === '/admin/forum' && !userIsAdmin) {
                    return null
                }

                return (
                    <Link href={tab.route} key={tab.route}>
                        <a
                            className={clsx(styles.Tab, {
                                [styles.Active]: tab.active,
                            })}
                            id={tab.route}
                        >
                            <span className={styles.Title}>{tab.title}</span>
                        </a>
                    </Link>
                )
            })}
        </div>
    )
}

export default ForumTabs
