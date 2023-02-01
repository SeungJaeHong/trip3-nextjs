import React, {useCallback, useState} from "react"
import styles from "./FormImageUpload.module.scss"
import {useDropzone} from 'react-dropzone'

type Props = {
    id: string
    label?: string
    placeholder?: string
    files?: string[]
    onChange: (value: any) => void
    maxFiles: number
    error: string
    disabled: boolean
    accept: string[]
    maxSize: number
    required: boolean
}

const FormImageUpload = (props: Props) => {
    const [error, setError] = useState<string|undefined>(undefined)
    const [files, setFiles] = useState<string[]>(props.files || [])

    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        setError(undefined)
        setFiles([])

        if (fileRejections.length > 0) {
            if (fileRejections.length > props.maxFiles) {
                setError('Lubatud failide arv on ' + props.maxFiles)
            } else if (fileRejections[0].errors[0].code === 'file-too-large') {
                setError('Fail on liiga suur')
            }
        } else {
            setFiles(acceptedFiles.map((file: File) => URL.createObjectURL(file)))
        }

        props.onChange(acceptedFiles)
    }, [])

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        maxFiles: props.maxFiles,
        accept: props.accept.toString(),
        maxSize: props.maxSize * 1024 * 1024, //mb to bytes
        disabled: props.disabled
    })

    const renderPreviewImages = () => {
        if (files.length === 0) {
            return null
        }

        return (
            <div className={styles.Preview}>
                {files.map((url, i) => {
                    return (
                        <div className={styles.Thumb} key={'image_' + i}>
                            <div className={styles.ThumbInner}>
                                <img
                                    // @ts-ignore
                                    src={url}
                                    alt={''}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className={styles.FormImageUpload}>
            {props.label && <label>{props.label}{props.required ? <span>*</span> : null}</label>}
            <div className={styles.DropzoneContainer}>
                <div className={styles.DropzoneContent}>
                    {renderPreviewImages()}
                    <div className={styles.Dropzone} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>{props.placeholder}</p>
                    </div>
                </div>
                {(props.error?.length > 0 || error) &&
                    <div className={styles.Error}>
                        {props.error || error}
                    </div>
                }
            </div>
        </div>
    )
}

FormImageUpload.defaultProps = {
    maxFiles: 1,
    placeholder: 'Lohista pilt siia või kliki',
    error: '',
    disabled: false,
    accept: ['image/jpeg', 'image/png'],
    maxSize: 5,
    files: [],
    required: false
}

export default FormImageUpload

