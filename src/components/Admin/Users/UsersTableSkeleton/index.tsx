import styles from './UsersTableSkeleton.module.scss'
import { Skeleton } from '@mantine/core'

const UsersTableSkeleton = () => {
    return (
        <div className={styles.Container}>
            {Array.from(Array(8).keys()).map(i => {
                return (
                    <div className={styles.Row} key={'s_' + i}>
                        <div className={styles.Rectangle}>
                            <Skeleton width={200} height={56} mt={2} radius="sm" />
                            <Skeleton height={56} mt={2} radius="sm" />
                            <Skeleton height={56.6} mt={2} radius="sm" />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default UsersTableSkeleton
