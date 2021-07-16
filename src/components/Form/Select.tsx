import React from "react";
import styles from "./FormSelect.module.scss";
import Select from "react-select";
import clsx from "clsx";

type Props = {
    id: string,
    options: [],
    placeholder?: string,
    className?: string
}

const FormSelect = (props: Props) => {

    /*const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'value1', label: 'Value1' },
        { value: 'value2', label: 'Value2' }
    ]*/

    return (
        <div className={styles.FormSelectContainer}>
            <Select
                instanceId={props.id}
                options={props.options}
                className={clsx(styles.FormSelect, props.className)}
                classNamePrefix={'FormSelect'}
                isClearable={true}
                placeholder={props.placeholder} />
        </div>

    )
}

export default FormSelect

