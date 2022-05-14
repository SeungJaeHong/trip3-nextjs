import styles from './ImageSelectSidebar.module.scss'
import clsx from 'clsx'
import CloseIcon from '../../icons/CloseIcon'
import { useDropzone } from 'react-dropzone'
import React, { useCallback, useEffect, useState } from 'react'
import { getInternalImages, uploadInternalImages } from '../../services/image.service'
import Image from 'next/image'
import LoadingSpinner from '../LoadingSpinner'
import { toast } from 'react-toastify'

type Props = {
    open: boolean
    onClose: () => void
    onImageSelect: (imageId: number) => void
}

const ImageSelectSidebar = ({ open, onClose, onImageSelect }: Props) => {
    const [images, setImages] = useState<{ id: number; imageUrl: string }[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (open) {
            getInternalImages().then((res) => {
                setImages(res.data)
            })
        }
    }, [open])

    const onDrop = useCallback(
        (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles.length) {
                setLoading(true)
                uploadInternalImages(acceptedFiles)
                    .then((res) => {
                        const newImages = [...res.data, ...images]
                        setImages(newImages)
                    })
                    .catch((e) => {
                        toast.error('Piltide ülaslaadimine ebaõnnstus')
                    })
                    .finally(() => setLoading(false))
            }
        },
        [images]
    )

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 5,
        accept: ['image/jpeg', 'image/png'],
        maxSize: 5 * 1024 * 1024, //mb to bytes
        disabled: false,
    })

    return (
        <div
            className={clsx(styles.ImageSelectSidebar, {
                [styles.Open]: open,
            })}
        >
            {loading && (
                <div className={styles.Loading}>
                    <LoadingSpinner />
                </div>
            )}
            <div className={styles.CloseIcon}>
                <CloseIcon onClick={onClose} />
            </div>
            <div className={styles.Content}>
                <div className={styles.Dropzone} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Lohista pilt siia või kliki (max 5)</p>
                </div>
                <div className={styles.Images}>
                    {images.map((image) => {
                        return (
                            <div className={styles.Image} key={image.id} onClick={() => onImageSelect(image.id)}>
                                <Image key={image.id} src={image.imageUrl} alt={''} width={180} height={180} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

ImageSelectSidebar.defaultProps = {
    open: false,
}

export default ImageSelectSidebar
