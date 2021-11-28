import React from "react"
import styles from "./UserProfileAvatar.module.scss"
import {UserProfile} from "../../../types"
import clsx from "clsx"

const UserProfileAvatar = (user: UserProfile) => {
    const imgSrc = user.avatar ?? '/images/noUser.png'
    return (
        <div className={clsx(styles.UserProfileAvatar, {
            ['userRank' + user.rank]: true
        })}>
            <div className={styles.Image}>
                <img src={imgSrc} alt={user.name} />
            </div>
            <div className={styles.Rank}>
                {user.rankName}
            </div>
            {user.rank !== 0 && user.rank !== 4 &&
                <div className={clsx(styles.Corner, styles.Top)} />
            }
            {user.rank === 1 &&
                <div className={clsx(styles.Corner, styles.Right)} />
            }
            {user.rank === 2 &&
                <div className={clsx(styles.Corner, styles.Bottom)} />
            }
            {user.rank === 3 &&
                <div className={clsx(styles.Corner, styles.Left)} />
            }
        </div>
    )
}

export default UserProfileAvatar