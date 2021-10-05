import React from "react"
import styles from "./FormCheckbox.module.scss"
import clsx from "clsx"

// @ts-ignore
const FormCheckbox = ({name, label, error, register, ...props }: props) => {
    return (
        <div className={clsx(styles.FormCheckbox, props.className, {
            [styles.Invalid]: error.length > 0
        })}>
            <div className={styles.FormElement}>
                <input type="checkbox" {...register(name)} {...props} />

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
    error: ''
}

export default FormCheckbox