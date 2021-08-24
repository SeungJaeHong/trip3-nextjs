import React from "react"
import styles from "./FormInput.module.scss"
import clsx from "clsx"

type Props = {
    name: string
    label: string
    type: string
    value?: string
    placeholder?: string
    className?: string
}

const FormInput = (props: Props) => {
    return (
        <div className={clsx(styles.FormInput, props.className)}>
            <label htmlFor={props.name}>
                {props.label}
            </label>
            <input
                name={props.name}
                id={props.name}
                value={props.value}
                type={props.type}
                autoComplete={'off'}
                spellCheck={false}
                placeholder={props.placeholder} />
        </div>
    )
}

FormInput.defaultProps = {
    type: 'text'
}

export default FormInput

