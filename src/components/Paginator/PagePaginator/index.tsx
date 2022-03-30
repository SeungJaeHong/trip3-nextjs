import React from 'react'
import styles from './PagePaginator.module.scss'
import Link from 'next/link'
import clsx from "clsx"

type Props = {
    currentPage: number
    lastPage: number
    baseUrl: string
}

const PagePaginator = ({currentPage, lastPage, baseUrl}: Props) => {
    const pages: { value: any, selected: boolean }[] = []
    if (lastPage === 1) {
        return null
    }

    const url = baseUrl.includes('?') ? baseUrl + '&page=' : baseUrl + '?page=';

    if (lastPage <= 6) {
        {[...Array(lastPage)].map((x, i) =>
            pages.push({
                value: i + 1,
                selected: (currentPage === i + 1)
            })
        )}
    } else {
        let range = []
        let left = currentPage - 2
        let right = currentPage + 3
        let l

        for (let i = 1; i <= lastPage; i++) {
            if (i == 1 || i == lastPage || i >= left && i < right) {
                range.push({
                    value: i,
                    selected: (currentPage === i)
                })
            }
        }

        for (let item of range) {
            if (l) {
                if (item.value - l === 2) {
                    pages.push({
                        value: l + 1,
                        selected: currentPage === l + 1
                    })
                } else if (item.value - l !== 1) {
                    pages.push({
                        value: '...',
                        selected: false
                    })
                }
            }
            pages.push(item)
            l = item.value
        }
    }

    return (
        <div className={styles.PagePaginator}>
            {
                currentPage === 1
                    ? <div className={clsx(styles.Arrow, styles.ArrowDisabled)}>‹</div>
                    : <Link href={url + (currentPage - 1)} key={'prev_arrow'}>
                        <a className={styles.Arrow}>
                            ‹
                        </a>
                    </Link>
            }

            {pages.map((page, i) => {
                if (page.value === '...') {
                    return <div className={styles.Dots} key={'dots_' + i}>...</div>
                } else if (page.selected) {
                    return <div className={clsx(styles.PageNumber, {
                        [styles.Disabled]: page.selected
                    })} key={page.value}>{page.value}</div>
                } else {
                    return (
                        <Link href={url + page.value} key={page.value}>
                            <a className={styles.PageNumber}>
                                {page.value}
                            </a>
                        </Link>
                    )
                }
            })}

            {
                currentPage === lastPage
                    ? <div className={clsx(styles.Arrow, styles.ArrowDisabled)}>›</div>
                    : <Link href={url + (currentPage + 1)} key={'next_arrow'}>
                        <a className={styles.Arrow}>
                            ›
                        </a>
                    </Link>
            }
        </div>
    )
}

export default PagePaginator