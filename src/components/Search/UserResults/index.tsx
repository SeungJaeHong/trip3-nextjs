import styles from './SearchUserResults.module.scss'
import React from 'react'
import {UserSearchResult} from '../../../services/search.service'
import Link from 'next/link'
import UserAvatar from "../../User/UserAvatar"

type Props = {
    results: UserSearchResult[]
}

const SearchUserResults = ({ results }: Props) => {
    return (
        <div className={styles.SearchUserResults}>
            <div className={styles.Results}>
                {results.map((result) => {
                    const itemUrl = '/user/' + result.id
                    return (
                        <div className={styles.UserRow} key={result.id}>
                            <div className={styles.Avatar}>
                                <UserAvatar user={{...result, isAdmin: false, avatar: result.image}} />
                            </div>
                            <div className={styles.TitleContainer}>
                                <Link href={itemUrl}>
                                    <a className={styles.Title}>{result.name}</a>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchUserResults
