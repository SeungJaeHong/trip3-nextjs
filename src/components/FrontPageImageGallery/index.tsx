import ImageGallery from "../ImageGallery"
import {Image} from "../../types"
import {useEffect, useState} from "react"
import {getLatestImages} from "../../services/general.service"

const FrontPageImageGallery = () => {
    const [images, setImages] = useState<Image[]>([])
    useEffect(() => {
        getLatestImages().then((response) => {
            setImages(response.data)
        }).catch(err => {

        })
    }, [])

    if (images.length === 0) {
        return null
    }

    return <ImageGallery images={images} />
}

export default FrontPageImageGallery