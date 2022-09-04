import React from 'react'
import styles from './FormSelect.module.scss'
import Select, {SingleValue} from 'react-select'
import clsx from 'clsx'

type Props = {
    id: string
    value?: string
    label?: string
    options: { value: string; label: string }[]
    placeholder?: string
    className?: string
    classNamePrefix?: string
    isClearable: boolean
    onChange: (value: any) => void
    error: string
    disabled: boolean,
    required: boolean
}

const FormSelect = (props: Props) => {
    const onChangeValue = (value?: SingleValue<{ value: string; label: string }>) => {
        props.onChange(value?.value)
    }

    return (
        <div className={styles.FormSelectContainer}>
            {props.label && <label>{props.label}{props.required ? <span>*</span> : null}</label>}
            <Select
                instanceId={props.id}
                options={props.options}
                isDisabled={props.disabled}
                defaultValue={props.options.find(o => o.value === props.value)}
                className={clsx(styles.FormSelect, props.className, {
                    [styles.Invalid]: props.error.length > 0
                })}
                classNamePrefix={props.classNamePrefix}
                isClearable={props.isClearable}
                noOptionsMessage={() => 'Valikud puuduvad'}
                placeholder={props.placeholder}
                onChange={onChangeValue}
            />

            {props.error?.length > 0 &&
                <div className={styles.ErrorText}>
                    {props.error}
                </div>
            }
        </div>
    )
}

FormSelect.defaultProps = {
    classNamePrefix: 'FormSelect',
    isClearable: true,
    error: '',
    disabled: false,
    required: false,
    options: []
}

export default FormSelect
