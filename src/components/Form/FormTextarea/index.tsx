import React from "react"
import stylesInput from "../FormInput/FormInput.module.scss"
import styles from "./FormTextarea.module.scss"
import clsx from "clsx"

// @ts-ignore
const FormTextarea = ({ id, name, label, error, register, ...props }: props) => {
    return (
        <div className={clsx(stylesInput.FormInput, styles.FormTextarea, props.className, {
            [stylesInput.Invalid]: error.length > 0
        })}>
            {label !== undefined &&
                <label htmlFor={props.id ?? props.name}>
                    {label}
                </label>
            }

            <textarea spellCheck={false} rows={8} {...register(name)} {...props} />

            {error?.length > 0 &&
                <div className={stylesInput.ErrorText}>
                    {error}
                </div>
            }
        </div>
    )
}

FormTextarea.defaultProps = {
    label: undefined,
    spellCheck: false,
    error: ''
}

export default FormTextarea