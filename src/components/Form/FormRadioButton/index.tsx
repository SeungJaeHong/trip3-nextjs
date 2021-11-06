import React from "react"
import styles from "./FormRadioButton.module.scss"
import clsx from "clsx"

// @ts-ignore
const FormRadioButton = ({id, name, value, label, error, register, ...props }: props) => {
    return (
        <div className={clsx(styles.FormRadioButton, props.className, {
            [styles.Invalid]: error.length > 0
        })}>
            <div className={styles.FormElement}>
                <label htmlFor={props.id}>
                    <input type="radio" value={value} {...register(name)} {...props} />
                    {label}
                </label>
            </div>
        </div>
    )
}

FormRadioButton.defaultProps = {
    error: ''
}

export default FormRadioButton