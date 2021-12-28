import ImageGallery from "../../ImageGallery"
import styles from './UserImageGallery.module.scss'
import {Image, UserPublicProfile} from "../../../types"
import {useEffect, useState} from "react"
import {getUserImages} from "../../../services/user.service"

const UserImageGallery = (user: UserPublicProfile) => {
    const [images, setImages] = useState<Image[]>([])
    useEffect(() => {
        getUserImages(user.id).then((response) => {
            setImages(response.data)
        }).catch(err => {

        })
    }, [])

    if (images.length === 0) {
        return null
    }

    return (
        <div className={styles.UserImageGallery}>
            <ImageGallery images={images} />
        </div>
    )
}

export default UserImageGallery