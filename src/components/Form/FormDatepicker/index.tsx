import React, {useState} from 'react'
import styles from './FormDatepicker.module.scss'
import clsx from 'clsx'
import {addYears, format} from 'date-fns'
import { et } from 'date-fns/locale'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
// @ts-ignore
import { DateRangePicker } from 'react-date-range'
import Button from "../../Button"

// @ts-ignore
const FormDatepicker = ({ id, name, value, label, type, error, onChange, register, ...props }: props) => {
    //console.log(value)

    const [selectedRange, setSelectedRange] = useState({
        startDate : null,
        endDate : new Date(''),
        key: 'selection'
    });

    const onValueChange = (value: any) => {
        const selection = value.selection
        if (selection) {
            //console.log(value.selection, 'value')
            setSelectedRange(selection)
        }
    }

    const onValueSubmit = () => {
        onChange({
            startDate: selectedRange.startDate ? format(selectedRange.startDate, 'yyyy-MM-dd') : undefined,
            endDate: selectedRange.endDate ? format(selectedRange.endDate, 'yyyy-MM-dd') : undefined
        })
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
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={[selectedRange]}
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
                startDatePlaceholder={'Algus'}
                endDatePlaceholder={'Lõpp'}
            />
            <div className={styles.SelectButton}>
                <Button title={'Vali'} onClick={onValueSubmit} />
            </div>

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
