import React from "react";
import styles from "./FormSelect.module.scss";
import Select from "react-select";
import clsx from "clsx";

type Props = {
    id: string,
    selectedValue?: string
    options: { value: string, label: string }[],
    placeholder?: string,
    className?: string
    classNamePrefix?: string
    isClearable: boolean
    onChange: (value: any) => void
}

const FormSelect = (props: Props) => {
    return (
        <div className={styles.FormSelectContainer}>
            <Select
                instanceId={props.id}
                options={props.options}
                value = {props.options.filter(option => option.value === props.selectedValue)}
                className={clsx(styles.FormSelect, props.className)}
                classNamePrefix={props.classNamePrefix}
                isClearable={props.isClearable}
                noOptionsMessage={() => 'Valikud puuduvad'}
                placeholder={props.placeholder}
                onChange = {value => props.onChange(value)} />
        </div>
    )
}

FormSelect.defaultProps = {
    classNamePrefix: 'FormSelect',
    isClearable: true
}

export default FormSelect

