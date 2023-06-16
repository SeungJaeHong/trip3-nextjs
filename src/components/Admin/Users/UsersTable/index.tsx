import styles from './UsersTable.module.scss'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { getUsers } from '../../../../services/admin.service'
import { Tooltip } from '@mantine/core'
import EditIcon from '../../../../icons/EditIcon'
import TrashIcon from '../../../../icons/TrashIcon'
import Link from 'next/link'
import UserBlockedIcon from '../../../../icons/UserBlocked'
import ArrowLeftIcon from '../../../../icons/ArrowLeftIcon'
import ArrowRightIcon from '../../../../icons/ArrowRightIcon'
import { useDebounce } from 'use-debounce'
import UsersTableSkeleton from '../UsersTableSkeleton'
import clsx from 'clsx'

export type UserTableUser = {
    id: number
    name: string
    email: string
    rank: number
    joinedDate: string
}

type paramsType = {
    id?: number
    name?: string
    email?: string
    page: number
}

const UsersTable = () => {
    const { mutate } = useSWRConfig()
    const initialParams: paramsType = {
        id: undefined,
        name: undefined,
        email: undefined,
        page: 1,
    }

    const [params, setParams] = useState<paramsType>(initialParams)
    const [debouncedValue] = useDebounce(params, 300)

    const { data, isValidating } = useSWR('get_users_for_users_table', () => getUsers(debouncedValue), {
        fallbackData: { users: [], page: 1, total: 0, hasMore: false },
        shouldRetryOnError: false,
        revalidateOnFocus: false,
    })

    const onInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>, type: string) => {
            const value = type === 'id' ? parseInt(e.target.value) : e.target.value
            setParams({ ...params, [type]: value, page: 1 })
        },
        [params]
    )

    const onPreviousPageClick = () => {
        if (data.page === 1 || isValidating) {
            return false
        }

        setParams({ ...params, page: data.page - 1 })
    }

    const onNextPageClick = () => {
        if (!data.hasMore || isValidating) {
            return false
        }

        setParams({ ...params, page: data.page + 1 })
    }

    useEffect(() => {
        mutate('get_users_for_users_table')
    }, [debouncedValue, mutate])

    const renderLoading = useCallback(() => {
        return (
            <tr>
                <td colSpan={5}>
                    <UsersTableSkeleton />
                </td>
            </tr>
        )
    }, [])

    const renderRows = useCallback(() => {
        return data.users?.map((row) => {
            return (
                <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>
                        <Link href={'/user/' + row.id}>
                            <a>{row.name}</a>
                        </Link>
                    </td>
                    <td>{row.email}</td>
                    <td>{row.joinedDate}</td>
                    <td>
                        <div className={styles.ActionButtons}>
                            <Tooltip label="Muuda">
                                <button>
                                    <EditIcon width={20} height={20} />
                                </button>
                            </Tooltip>
                            <Tooltip label="Blokeeri">
                                <button disabled={true}>
                                    <UserBlockedIcon width={18} height={18} />
                                </button>
                            </Tooltip>
                            <Tooltip label="Kustuta">
                                <button disabled={true}>
                                    <TrashIcon width={20} height={20} />
                                </button>
                            </Tooltip>
                        </div>
                    </td>
                </tr>
            )
        })
    }, [data])

    return (
        <div className={styles.Container}>
            <table className={isValidating ? styles.Loading : undefined}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nimi</th>
                        <th>Email</th>
                        <th>Liitus</th>
                        <th></th>
                    </tr>
                    <tr className={styles.InputsTr}>
                        <th>
                            <input
                                type={'number'}
                                placeholder={'Otsi...'}
                                min={1}
                                onChange={(e) => onInputChange(e, 'id')}
                            />
                        </th>
                        <th>
                            <input type={'text'} placeholder={'Otsi...'} onChange={(e) => onInputChange(e, 'name')} />
                        </th>
                        <th>
                            <input type={'text'} placeholder={'Otsi...'} onChange={(e) => onInputChange(e, 'email')} />
                        </th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{isValidating ? renderLoading() : renderRows()}</tbody>
            </table>
            <div className={styles.PaginationContainer}>
                <div className={styles.PaginationButtons}>
                    <div
                        className={clsx(styles.PaginationButton, {
                            [styles.Disabled]: data.page === 1 || isValidating,
                        })}
                        onClick={() => onPreviousPageClick()}
                    >
                        <ArrowLeftIcon />
                    </div>
                    <div
                        className={clsx(styles.PaginationButton, {
                            [styles.Disabled]: !data.hasMore || isValidating,
                        })}
                        onClick={() => onNextPageClick()}
                    >
                        <ArrowRightIcon />
                    </div>
                </div>
                <div className={styles.PaginationInfo}>
                    {'Kuvan ' + ((data.page - 1) * 10 + 1) + '-' + data.page * 10 + ' tulemust ' + data.total + '-st'}
                </div>
            </div>
        </div>
    )
}

export default UsersTable
