import styles from './SearchFlightResults.module.scss'
import React from 'react'
import {FlightSearchResult} from '../../../services/search.service'
import Link from 'next/link'

type Props = {
    results: FlightSearchResult[]
}

const SearchFlightResults = ({ results }: Props) => {
    return (
        <div className={styles.SearchFlightResults}>
            <div className={styles.Results}>
                {results.map((result) => {
                    const itemUrl = '/odavad-lennupiletid/' + result.slug
                    return (
                        <div className={styles.FlightRow} key={result.id}>
                            <div className={styles.TitleContainer}>
                                <Link href={itemUrl}>
                                    <a className={styles.Title}>{result.title}</a>
                                </Link>
                                <div className={styles.CreatedAt}>{result.created_at}</div>
                            </div>
                            <div className={styles.ContentContainer}>
                                <Link href={itemUrl}>
                                    <a className={styles.Content}>
                                        {result.body.length > 230
                                            ? result.body.substring(0, 230).concat('...')
                                            : result.body}
                                    </a>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchFlightResults
