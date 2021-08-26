import React from "react"
import styles from "./FormInput.module.scss"
import clsx from "clsx"

// @ts-ignore
const FormInput = ({ field, form, children, label, ...props }) => {
    return (
        <div className={clsx(styles.FormInput, props.className)}>
            {label !== undefined &&
                <label htmlFor={props.id}>
                    {label}
                </label>
            }

            <input
                {...field}
                {...props} />
        </div>
    )
}

FormInput.defaultProps = {
    type: 'text',
    spellCheck: false,
    autoComplete: 'off'
}

export default FormInput

