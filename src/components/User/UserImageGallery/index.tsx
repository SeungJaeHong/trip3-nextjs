import ImageGallery from "../../ImageGallery"
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
    }, [user.id])

    if (images.length === 0) {
        return null
    }

    return <ImageGallery images={images} />
}

export default UserImageGallery