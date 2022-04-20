import styles from './SkeletonLoader.module.scss'
import { Skeleton } from '@mantine/core'

type Props = {
    repeat: number
}

const SkeletonLoader = ({ repeat}: Props) => {
    return (
        <div className={styles.Container}>
            {Array.from(Array(repeat).keys()).map(i => {
                return (
                    <div className={styles.Row} key={'s_' + i}>
                        <div className={styles.Round}>
                            <Skeleton height={70} circle />
                        </div>
                        <div className={styles.Rectangle}>
                            <Skeleton height={10} mt={6} radius="xl" />
                            <Skeleton height={10} mt={6} radius="xl" />
                            <Skeleton height={10} mt={6} width="70%" radius="xl" />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

SkeletonLoader.defaultProps = {
    repeat: 3,
}

export default SkeletonLoader
