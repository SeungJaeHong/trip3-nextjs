import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './SearchTabs.module.scss'
import clsx from "clsx"

const SearchTabs = () => {
    const router = useRouter()
    const q = router.query.q
    const type = router.query.type
    const tabs = [
        {
            title: 'Foorum',
            route: '/search?q=' + q + '&type=forum',
            active: !type || type === 'forum'
        },
        {
            title: 'Lennupakkumised',
            route: '/search?q=' + q + '&type=flight',
            active: type === 'flight'
        },
        {
            title: 'Uudised',
            route: '/search?q=' + q + '&type=news',
            active: type === 'news'
        },
        {
            title: 'Sihtkohad',
            route: '/search?q=' + q + '&type=destination',
            active: type === 'destination'
        },
        {
            title: 'Kasutajad',
            route: '/search?q=' + q + '&type=user',
            active: type === 'user'
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