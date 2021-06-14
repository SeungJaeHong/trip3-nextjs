import Link from 'next/link'
import styles from './TravelmateRow.module.scss'
import UserIcon from "../../icons/UserIcon";
import clsx from "clsx";

type Props = {
    title: string
    //data: any
}

const TravelmateRow = (props: Props) => {
    return (
        <div className={styles.TravelmateRow}>
            <div className={styles.Avatar}>
                <Link href={'/'}>
                    <a>
                        <UserIcon />
                    </a>
                </Link>
            </div>
            <div className={styles.Content}>
                <Link href={'/'}>
                    <a className={styles.Title}>{props.title}</a>
                </Link>
                <div className={styles.Meta}>
                    <Link href={'/'}>
                        <a>Täna 23:31</a>
                    </Link>
                    <Link href={'/'}>
                        <a className={styles.Creator}>SomeUser</a>
                    </Link>
                    <Link href={'/'}>
                        <a>Hispaania</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TravelmateRow