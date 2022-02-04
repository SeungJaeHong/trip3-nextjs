import styles from "./ImageSelectSidebar.module.scss"
import clsx from "clsx"
import CloseIcon from "../../icons/CloseIcon"
import {useDropzone} from "react-dropzone"
import React, {useEffect, useState} from "react"
import {getInternalImages} from "../../services/image.service"
import Image from 'next/image'

type Props = {
    open: boolean
    onClose: () => void
    onImageSelect: () => void
}

const ImageSelectSidebar = ({open, onClose, onImageSelect}: Props) => {
    const [images, setImages] = useState<{id: number, imageUrl: string}[]>([])
    useEffect(() => {
        if (open) {
            getInternalImages().then(res => {
                setImages(res.data)
            })
        }
    }, [open])

    const {getRootProps, getInputProps} = useDropzone({
        maxFiles: 5,
        accept: ['image/jpeg', 'image/png'],
        maxSize: 5 * 1024 * 1024, //mb to bytes
        disabled: false
    })

    return (
        <div className={clsx(styles.ImageSelectSidebar, {
            [styles.Open]: open
        })}>
            <div className={styles.CloseIcon}>
                <CloseIcon onClick={onClose} />
            </div>
            <div className={styles.Content}>
                <div className={styles.Dropzone} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Lohista pilt siia või kliki</p>
                </div>
                <div className={styles.Images}>
                    {images.map(image => {
                        return (
                            <div className={styles.Image} key={image.id}>
                                <Image
                                    key={image.id}
                                    src={image.imageUrl}
                                    alt={''}
                                    layout={'fill'}
                                    objectFit={'cover'}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

ImageSelectSidebar.defaultProps = {
    open: false
}

export default ImageSelectSidebar