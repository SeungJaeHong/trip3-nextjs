import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './ForumTabs.module.scss'
import clsx from "clsx"
import useUser from "../../../hooks"

const ForumTabs = () => {
    const router = useRouter()
    const { loggedIn, user } = useUser()
    const userIsAdmin = loggedIn && user?.isAdmin
    const tabs = [
        {
            title: 'Üldfoorum',
            route: '/foorum/uldfoorum',
            active: router.pathname === '/foorum/uldfoorum'
        },
        {
            title: 'Ost-müük',
            route: '/foorum/ost-muuk',
            active: router.pathname === '/foorum/ost-muuk'
        },
        {
            title: 'Elu välismaal',
            route: '/foorum/elu-valismaal',
            active: router.pathname === '/foorum/elu-valismaal'
        },
        {
            title: 'Vaba teema',
            route: '/foorum/vaba-teema',
            active: router.pathname === '/foorum/vaba-teema'
        },
        {
            title: 'Minu jälgimised',
            route: '/foorum/minu-jalgimised',
            active: router.pathname === '/foorum/minu-jalgimised'
        },
        {
            title: 'Toimetus',
            route: '/admin/forum',
            active: false
        },
    ]

    return (
        <div className={styles.ForumTabs}>
            {tabs.map(tab => {
                if (tab.route === '/foorum/minu-jalgimised' && !loggedIn) {
                    return null
                }

                if (tab.route === '/admin/forum' && !userIsAdmin) {
                    return null
                }

                return (
                    <Link href={tab.route} key={tab.route}>
                        <a className={clsx(styles.Tab, {
                            [styles.Active]: tab.active
                        })}>
                            <span className={styles.Title}>
                                {tab.title}
                            </span>
                        </a>
                    </Link>
                )
            })}
        </div>
    )
}

export default ForumTabs