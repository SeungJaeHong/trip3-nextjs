import ImageGallery from "../../ImageGallery"
import {Image, UserPublicProfile} from "../../../types"
import {useEffect, useState} from "react"
import {getUserImages} from "../../../services/user.service"
import {toast} from "react-hot-toast"
import {hidePhoto} from "../../../services/general.service"

const UserImageGallery = (user: UserPublicProfile) => {
    const [images, setImages] = useState<Image[]>([])
    useEffect(() => {
        getUserImages(user.id).then((response) => {
            setImages(response.data)
        }).catch(err => {

        })
    }, [user.id])

    const hideImage = async (image: Image) => {
        await hidePhoto(image.id).then(res => {
            const newImages = images.filter(img => img.id !== image.id)
            setImages(newImages)
            toast.success('Pilt peidetud')
        }).catch(e => {
            toast.error('Pildi peitmine ebaõnnestus')
        })
    }

    if (images.length === 0) {
        return null
    }

    return <ImageGallery
        images={images}
        hideImage={hideImage} />
}

export default UserImageGallery