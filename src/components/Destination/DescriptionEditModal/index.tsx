import React, { useState } from 'react'
import { DestinationContent } from '../../../types'
import Modal from '../../Modal'
import styles from './DestinationDescriptionEditModal.module.scss'
import Button from '../../Button'

type Props = {
    destination: DestinationContent
    show: boolean
    onHide: () => void
    onDescriptionSave: (value: string) => void
}

const DestinationDescriptionEditModal = ({ destination, show, onHide, onDescriptionSave }: Props) => {
    const [value, setValue] = useState<string>(destination.description || '')
    return (
        <Modal show={show} onHide={onHide}>
            <div className={styles.Container}>
                <h2>{destination.description ? 'Muuda kirjeldust' : 'Lisa kirjeldus'}</h2>
                <textarea
                    rows={20}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <div className={styles.Buttons}>
                    <Button title={'Tagasi'} cancel={true} onClick={onHide} />
                    <Button title={'Salvesta'} onClick={() => onDescriptionSave(value)} />
                </div>
            </div>
        </Modal>
    )
}

DestinationDescriptionEditModal.defaultProps = {
    show: false,
}

export default DestinationDescriptionEditModal
