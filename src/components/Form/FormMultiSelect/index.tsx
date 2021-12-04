import React from "react";
import styles from "./FormMultiSelect.module.scss";
import Select from "react-select";
import clsx from "clsx";

type Props = {
    id: string
    options: { value: string, label: string }[] | []
    values?: { value: string, label: string }[]
    label?: string
    placeholder?: string
    className?: string
    classNamePrefix?: string
    isClearable: boolean
    onChange: (option: any) => void
    error: string
    disabled: boolean
}

const FormMultiSelect = (props: Props) => {
    return (
        <div className={styles.FormMultiSelect}>
            <label>{props.label}</label>
            <Select
                isMulti
                defaultValue={props.values}
                instanceId={props.id}
                options={props.options}
                onChange={props.onChange}
                isDisabled={props.disabled}
                className={clsx(styles.FormSelect, props.className)}
                classNamePrefix={props.classNamePrefix}
                isClearable={props.isClearable}
                noOptionsMessage={() => 'Valikud puuduvad'}
                placeholder={props.placeholder} />
        </div>
    )
}

FormMultiSelect.defaultProps = {
    classNamePrefix: 'FormMultiSelect',
    isClearable: true,
    placeholder: undefined,
    error: '',
    disabled: false
}

export default FormMultiSelect

