import React from 'react'
import styles from './FormDatepicker.module.scss'
import clsx from 'clsx'
import 'react-widgets/styles.css'
import DatePicker from 'react-widgets/DatePicker'
import { format } from 'date-fns'
import { et } from 'date-fns/locale'

// @ts-ignore
const FormDatepicker = ({ id, name, label, type, error, onChange, register, ...props }: props) => {
    console.log(register(name))

    const onValueChange = (value: Date | null | undefined, rawValue: string) => {
        console.log(value)

        let formattedValue = null
        if (value) {
            formattedValue = format(value, 'yyyy-MM-dd', {
                locale: et,
            })
        }

        console.log(formattedValue, 'formattedValue')

        //this.props.onChange(value);
    }

    return (
        <div
            className={clsx(styles.FormDatepicker, props.className, {
                [styles.Invalid]: error.length > 0,
            })}
        >
            {label !== undefined && <label htmlFor={props.id ?? props.name}>{label}</label>}

            <DatePicker
                id={id}
                name={name}
                containerClassName={'SomeClass'}
                onChange={onValueChange}
                value={new Date('2022-03-12')}
                //valueFormat={'yyyy-MM-dd'}
                valueFormat={{ day: "numeric" , month: "numeric", year: "numeric", parse: "yyyy-MM-dd"}}
                valueDisplayFormat={{ day: "numeric" , month: "numeric", year: "numeric" }}
                //valueDisplayFormat={{ format: "yyyy-MM-dd" }}
            />

            {error?.length > 0 && <div className={styles.ErrorText}>{error}</div>}
        </div>
    )
}

FormDatepicker.defaultProps = {
    label: undefined,
    error: '',
    disabled: false,
}

export default FormDatepicker
