import ImageGallery from "../../ImageGallery"
import {Destination, Image} from "../../../types"
import {useEffect, useState} from "react"
import {toast} from "react-hot-toast"
import {hidePhoto} from "../../../services/general.service"
import {getDestinationImages} from "../../../services/destination.service"

const DestinationImageGallery = (destination: Destination) => {
    const [images, setImages] = useState<Image[]>([])
    useEffect(() => {
        getDestinationImages(destination).then((response) => {
            setImages(response.data)
        }).catch(err => {

        })
    }, [destination])

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

export default DestinationImageGallery