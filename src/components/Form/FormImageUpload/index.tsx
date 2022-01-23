import React, {useCallback, useState} from "react"
import styles from "./FormImageUpload.module.scss"
import {useDropzone} from 'react-dropzone'

type Props = {
    id: string,
    value?: string
    label?: string
    placeholder?: string
    onChange: (value: any) => void
    maxFiles: number
    error: string
    disabled: boolean
    mimeTypes: Array<string>
    maxSize: number
}

const FormImageUpload = (props: Props) => {
    const [error, setError] = useState<string|undefined>(undefined)
    const [files, setFiles] = useState<File[]>([])

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
            setFiles(acceptedFiles.map((file: File) => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })))
        }

        props.onChange(acceptedFiles)
    }, [])

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        maxFiles: props.maxFiles,
        accept: props.mimeTypes.toString(),
        maxSize: props.maxSize * 1024 * 1024, //mb to bytes
        disabled: props.disabled
    })

    const renderPreviewImages = () => {
        return (
            <div className={styles.Preview}>
                {files.map(file => {
                    return (
                        <div className={styles.Thumb} key={file.name}>
                            <div className={styles.ThumbInner}>
                                <img
                                    // @ts-ignore
                                    src={file.preview}
                                    alt={file.name}
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
            {props.label && <label>{props.label}</label>}
            <div className={styles.DropzoneContainer} {...getRootProps()}>
                <input {...getInputProps()} />
                <p>{props.placeholder}</p>
            </div>
            {(props.error?.length > 0 || error) &&
                <div className={styles.Error}>
                    {props.error || error}
                </div>
            }
            {renderPreviewImages()}
        </div>
    )
}

FormImageUpload.defaultProps = {
    maxFiles: 1,
    placeholder: 'Lohista pilt siia või kliki',
    error: '',
    disabled: false,
    mimeTypes: ['image/jpeg', 'image/png'],
    maxSize: 5
}

export default FormImageUpload

