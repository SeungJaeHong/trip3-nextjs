import Link from 'next/link'
import styles from './ForumRow.module.scss'
import UserIcon from '../../../icons/UserIcon'

const ForumRow = (props: any) => {
    return (
        <div className={styles.ForumRow}>
            <div className={styles.UserIcon}>
                <UserIcon />
            </div>
            <div className={styles.Content}>
                <Link href={'/'}>
                    <a>
                        <div className={styles.Title}>
                            Lorem Ipsum is simply dummy text of the printing
                        </div>
                    </a>
                </Link>
                <div className={styles.Meta}>
                    <span className="text-base text-gray-500">
                        Täna 13:21
                    </span>
                    <span className="text-base text-gray-500">
                        Loetud 347 korda
                    </span>
                    <span className="text-base font-medium text-cyan-500">
                        SomeUser
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ForumRow