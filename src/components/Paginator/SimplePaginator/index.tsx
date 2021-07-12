import styles from './SimplePaginator.module.scss'
import Link from 'next/link'
import clsx from "clsx";

type Props = {
    nextPageUrl?: string | undefined,
    previousPageUrl?: string | undefined,
}

const SimplePaginator = (props: Props) => {
    const previousButton = () => {
        if (!props.previousPageUrl) {
            return <span>‹ &nbsp; Eelmine</span>
        } else {
            return (
                <Link href={props.previousPageUrl}>
                    <a>‹ &nbsp; Eelmine</a>
                </Link>
            )
        }
    }

    const nextButton = () => {
        if (!props.nextPageUrl) {
            return <span>Järgmine &nbsp; ›</span>
        } else {
            return (
                <Link href={props.nextPageUrl}>
                    <a>Järgmine &nbsp; ›</a>
                </Link>
            )
        }
    }

    if (!props.previousPageUrl && !props.nextPageUrl) {
        return null
    }

    return (
        <div className={styles.SimplePaginator}>
            <div className={clsx(styles.Button, {
                [styles.Disabled]: props.previousPageUrl === undefined
            })}>
                {previousButton()}
            </div>

            <div className={clsx(styles.Button, {
                [styles.Disabled]: props.nextPageUrl === undefined
            })}>
                {nextButton()}
            </div>
        </div>
    )
}

export default SimplePaginator