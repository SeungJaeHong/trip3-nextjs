import React from "react"
import stylesInput from "../FormInput/FormInput.module.scss"
import styles from "./FormCodeMirrorEditor.module.scss"
import clsx from "clsx"

type Props = {
    id: string
    name: string
    label?: string
    placeholder?: string
    onChange: (value: any) => void
    error: string
    disabled: boolean
    className?: string
}

const FormCodeMirrorEditor = ({ id, name, label, error, onChange, className }: Props) => {
    return (
        <div className={clsx(stylesInput.FormInput, styles.FormCodeMirrorEditor, className, {
            [stylesInput.Invalid]: error.length > 0
        })}>
            {label !== undefined &&
                <label htmlFor={id ?? name}>
                    {label}
                </label>
            }

            <textarea spellCheck={false} rows={8} name={name} onClick={() => console.log('click')} />

            {error?.length > 0 &&
                <div className={stylesInput.ErrorText}>
                    {error}
                </div>
            }
        </div>
    )
}

FormCodeMirrorEditor.defaultProps = {
    label: undefined,
    spellCheck: false,
    error: ''
}

export default FormCodeMirrorEditor