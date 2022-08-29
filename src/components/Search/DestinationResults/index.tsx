import styles from './SearchDestinationResults.module.scss'
import React from 'react'
import {DestinationSearchResult} from '../../../services/search.service'
import Link from 'next/link'

type Props = {
    results: DestinationSearchResult[]
}

const SearchDestinationResults = ({ results }: Props) => {
    return (
        <div className={styles.SearchDestinationResults}>
            <div className={styles.Results}>
                {results.map((result) => {
                    const itemUrl = '/sihtkoht/' + result.slug
                    const name = result.parent_name ? result.name + ', ' + result.parent_name : result.name
                    return (
                        <div className={styles.DestinationRow} key={result.id}>
                            <div className={styles.TitleContainer}>
                                <Link href={itemUrl}>
                                    <a className={styles.Title}>{name}</a>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchDestinationResults
