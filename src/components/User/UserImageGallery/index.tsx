import ImageGallery from "../../ImageGallery"
import {Image, UserPublicProfile} from "../../../types"
import {useEffect, useState} from "react"
import {getUserImages} from "../../../services/user.service"
import {toast} from 'react-toastify'
import {hidePhoto} from "../../../services/general.service"
import {useRouter} from "next/router"

const UserImageGallery = (user: UserPublicProfile) => {
    const [images, setImages] = useState<Image[]>([])
    const [lastImage, setLastImage] = useState<Image|undefined>(undefined)
    const [imageCount, setImageCount] = useState<number>(0)
    const router = useRouter()

    useEffect(() => {
        getUserImages(user.id).then((response) => {
            setImages(response.data.images)
            setImageCount(response.data.imageCount)
            setLastImage(response.data.lastImage)
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
        hideImage={hideImage}
        imageCount={imageCount}
        lastImage={lastImage}
        lastImageOnClick={() => router.push('/user/' + user.id + '/images')} />
}

export default UserImageGallery