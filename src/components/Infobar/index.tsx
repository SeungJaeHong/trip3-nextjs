import styles from './Infobar.module.scss'
import React from 'react'
import PellRingIcon from '../../icons/PellRingIcon'

type Props = {
    children: React.ReactNode
}

const Infobar = ({ children }: Props) => {
    return (
        <div className={styles.Container}>
            <PellRingIcon />
            {children}
        </div>
    )
}

export default Infobar
