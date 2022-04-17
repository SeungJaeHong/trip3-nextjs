import styles from './SearchNewsResults.module.scss'
import React from 'react'
import { NewsSearchResult } from '../../../services/search.service'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
    results: NewsSearchResult[]
}

const SearchNewsResults = ({ results }: Props) => {
    return (
        <div className={styles.SearchNewsResults}>
            <div className={styles.Results}>
                {results.map((result) => {
                    const itemUrl = '/uudised/' + result.slug
                    return (
                        <div className={styles.NewsRow} key={result.id}>
                            <div className={styles.Thumb}>
                                <Link href={itemUrl}>
                                    <a>
                                        <Image
                                            src={result.image ?? '/images/no_image.jpeg'}
                                            width={180}
                                            height={120}
                                            alt={''}
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className={styles.Body}>
                                <div className={styles.TitleContainer}>
                                    <Link href={itemUrl}>
                                        <a className={styles.Title}>{result.title}</a>
                                    </Link>
                                    <div className={styles.CreatedAt}>{result.created_at}</div>
                                </div>
                                <div className={styles.ContentContainer}>
                                    <Link href={itemUrl}>
                                        <a className={styles.Content}>
                                            {result.body.length > 300
                                                ? result.body.substring(0, 300).concat('...')
                                                : result.body}
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchNewsResults
