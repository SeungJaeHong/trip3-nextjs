import { Admin } from '../../../../types'
import styles from './ModeratorCard.module.scss'
import UserAvatar from '../../../User/UserAvatar'
import React from 'react'
import { useRouter } from 'next/router'

const ModeratorCard = ({ admin }: { admin: Admin }) => {
    const router = useRouter()
    return (
        <div className={styles.Container} onClick={() => router.push('/user/' + admin.id)}>
            <div className={styles.Avatar}>
                <UserAvatar user={admin} />
            </div>
            <div className={styles.Name}>{admin.name}</div>
            <div className={styles.Joined}>Liitus {admin.joinedDate}</div>
            <div className={styles.Visited}>
                <span>
                    Riike külastanud: {admin.countriesVisited} ({admin.countryPercentage + '%'})
                </span>
            </div>
        </div>
    )
}

export default ModeratorCard
