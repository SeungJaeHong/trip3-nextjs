import { Admin } from '../../../../types'
import { useEffect, useState } from 'react'
import { getModerators } from '../../../../services/admin.service'
import styles from './ModeratorGrid.module.scss'
import ModeratorCard from '../ModeratorCard'
import LoadingSpinner from '../../../LoadingSpinner'

const ModeratorGrid = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [admins, setAdmins] = useState<Admin[]>([])

    useEffect(() => {
        setLoading(true)
        getModerators()
            .then((response) => {
                setAdmins(response.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className={styles.Loading}>
                <LoadingSpinner />
            </div>
        )
    }

    return (
        <div className={styles.Container}>
            {admins.map((admin) => {
                return <ModeratorCard admin={admin} key={admin.id} />
            })}
        </div>
    )
}

export default ModeratorGrid
