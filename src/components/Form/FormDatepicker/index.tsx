import React, {useState} from 'react'
import styles from './FormDatepicker.module.scss'
import clsx from 'clsx'
import {addYears} from 'date-fns'
import { et } from 'date-fns/locale'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
// @ts-ignore
import { DateRangePicker } from 'react-date-range'

// @ts-ignore
const FormDatepicker = ({ id, name, label, type, error, onChange, register, ...props }: props) => {
    //console.log(register(name))

    const [state, setState] = useState([
        {
            startDate : null,
            endDate : new Date(''),
            key: 'selection'
        }
    ]);

    const onValueChange = (value: any) => {
        const selection = value.selection
        if (selection) {
            console.log(value.selection, 'value')
            setState([selection])
        }


        /*let formattedValue = null
        if (value) {
            formattedValue = format(value, 'yyyy-MM-dd', {
                locale: et,
            })
        }

        console.log(formattedValue, 'formattedValue')*/

        //this.props.onChange(value);
    }

    return (
        <div
            className={clsx(styles.FormDatepicker, props.className, {
                [styles.Invalid]: error.length > 0,
            })}
        >
            {label !== undefined && <label htmlFor={props.id ?? props.name}>{label}</label>}

            <DateRangePicker
                onChange={onValueChange}
                //onRangeFocusChange={onRangeFocusChange}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={state}
                direction={'horizontal'}
                showDateDisplay={true}
                showPreview={true}
                locale={et}
                staticRanges={[]}
                inputRanges={[]}
                preventSnapRefocus={true}
                dateDisplayFormat={'dd.MM.yyyy'}
                monthDisplayFormat={'MMM yyyy'}
                weekdayDisplayFormat={'EEEEE'}
                dayDisplayFormat={'d'}
                maxDate={addYears(new Date(), 10)}
                minDate={addYears(new Date(), -1)}
                className={styles.RangePicker}
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
