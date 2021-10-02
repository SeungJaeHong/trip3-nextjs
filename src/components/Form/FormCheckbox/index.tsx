import React from "react"
import styles from "./FormCheckbox.module.scss"
import clsx from "clsx"

// @ts-ignore
const FormCheckbox = ({ field, form, children, label, hasError, error, ...props }) => {
    return (
        <div className={clsx(styles.FormCheckbox, props.className, {
            [styles.Invalid]: hasError || error.length > 0
        })}>
            <div className={styles.FormElement}>
                <input
                    type="checkbox"
                    {...field}
                    {...props} />

                <label htmlFor={props.id}>
                    {label}
                </label>
            </div>

            {error?.length > 0 &&
            <div className={styles.ErrorText}>
                {error}
            </div>
            }
        </div>
    )
}

FormCheckbox.defaultProps = {
    error: '',
    hasError: false
}

export default FormCheckbox