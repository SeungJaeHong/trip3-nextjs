import ImageGallery from "../ImageGallery"
import {Image} from "../../types"
import {useEffect, useState} from "react"
import {getLatestImages, hidePhoto} from "../../services/general.service"
import {toast} from "react-hot-toast"

const FrontPageImageGallery = () => {
    const [images, setImages] = useState<Image[]>([])
    const [lastImage, setLastImage] = useState<Image>()
    useEffect(() => {
        getLatestImages().then((response) => {
            setImages(response.data.images)
            setLastImage(response.data.lastImage)
        }).catch(err => {

        })
    }, [])

    if (images.length === 0) {
        return null
    }

    const hideImage = async (image: Image) => {
        await hidePhoto(image.id).then(res => {
            const newImages = images.filter(img => img.id !== image.id)
            setImages(newImages)
            toast.success('Pilt peidetud')
        }).catch(e => {
            toast.error('Pildi peitmine ebaõnnestus')
        })
    }

    return <ImageGallery
        images={images}
        hideImage={hideImage}
        lastImage={lastImage}
        lastImageTitle={'Kõik pildid'} />
}

export default FrontPageImageGallery