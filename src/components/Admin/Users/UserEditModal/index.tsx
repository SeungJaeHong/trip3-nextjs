import React from 'react'
import {UserProfile} from '../../../../types'
import Modal from '../../../Modal'
import styles from './UserEditModal.module.scss'
import UserEditForm from "../../../User/UserEditForm";
import CloseIcon from "../../../../icons/CloseIcon";
import {toast} from "react-toastify";

type Props = {
    user: UserProfile
    show: boolean
    onHide: () => void
    onUpdateSuccess: (user: UserProfile) => void
}

const UserEditModal = ({ user, show, onHide, onUpdateSuccess }: Props) => {
    const onUpdate = (user: UserProfile) => {
        toast.success('Profiili uuendamine õnnestus!')
        onUpdateSuccess(user)
    }

    return (
        <Modal show={show} onHide={onHide}>
            <div className={styles.Container}>
                <div className={styles.CloseButton} onClick={onHide}>
                    <CloseIcon />
                </div>
                <UserEditForm user={user} onUpdateSuccess={onUpdate}/>
            </div>
        </Modal>
    )
}

UserEditModal.defaultProps = {
    show: false,
}

export default UserEditModal
