import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './ForumTabs.module.scss'
import clsx from "clsx"

const ForumTabs = () => {
    const router = useRouter()
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
            route: '/foorum/toimetus',
            active: router.pathname === '/foorum/toimetus'
        },
    ]

    return (
        <div className={styles.ForumTabs}>
            {tabs.map(tab => {
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