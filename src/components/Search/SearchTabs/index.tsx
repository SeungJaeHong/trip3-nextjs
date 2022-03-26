import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './SearchTabs.module.scss'
import clsx from "clsx"

const SearchTabs = () => {
    const router = useRouter()
    const tabs = [
        {
            title: 'Foorum',
            route: '/foorum/uldfoorum',
            active: true
        },
        {
            title: 'Lennupakkumised',
            route: '/foorum/ost-muuk',
            active: router.pathname === '/foorum/ost-muuk'
        },
        {
            title: 'Uudised',
            route: '/foorum/elu-valismaal',
            active: router.pathname === '/foorum/elu-valismaal'
        },
        {
            title: 'Sihtkohad',
            route: '/foorum/vaba-teema',
            active: router.pathname === '/foorum/vaba-teema'
        },
        {
            title: 'Kasutajad',
            route: '/foorum/minu-jalgimised',
            active: router.pathname === '/foorum/minu-jalgimised'
        },
    ]

    return (
        <div className={styles.SearchTabs}>
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

export default SearchTabs