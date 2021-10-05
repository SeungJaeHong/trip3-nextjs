import React from "react"
import styles from "./FormInput.module.scss"
import clsx from "clsx"

// @ts-ignore
const FormInput = ({ id, name, label, type, error, register, ...props }: props) => {
    return (
        <div className={clsx(styles.FormInput, props.className, {
            [styles.Invalid]: error.length > 0
        })}>
            {label !== undefined &&
                <label htmlFor={props.id}>
                    {label}
                </label>
            }

            <input type={type} autoComplete={'off'} spellCheck={false} {...register(name)} {...props} />

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
    error: ''
}

export default FormInput

