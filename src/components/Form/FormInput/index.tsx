import React from "react"
import styles from "./FormInput.module.scss"
import clsx from "clsx"

// @ts-ignore
const FormInput = ({ field, form, children, label, hasError, error, ...props }) => {
    return (
        <div className={clsx(styles.FormInput, props.className, {
            [styles.Invalid]: hasError || error.length > 0
        })}>
            {label !== undefined &&
                <label htmlFor={props.id}>
                    {label}
                </label>
            }

            <input
                {...field}
                {...props} />

            {error?.length > 0 &&
                <div className={styles.ErrorText}>
                    {error}
                </div>
            }
        </div>
    )
}

FormInput.defaultProps = {
    type: 'text',
    label: undefined,
    spellCheck: false,
    autoComplete: 'off',
    error: '',
    hasError: false
}

export default FormInput

