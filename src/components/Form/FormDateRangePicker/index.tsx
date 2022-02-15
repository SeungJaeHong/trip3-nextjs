import React, { useState } from 'react'
import styles from './FormDateRangePicker.module.scss'
import clsx from 'clsx'
import { addYears, format } from 'date-fns'
import { et } from 'date-fns/locale'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
// @ts-ignore
import { DateRangePicker } from 'react-date-range'
import Button from '../../Button'

// @ts-ignore
const FormDateRangePicker = ({ id, value, label, error, onChange, ...props }: props) => {
    const [show, setShow] = useState<boolean>(false)
    const [selectedRange, setSelectedRange] = useState({
        startDate: null,
        endDate: new Date(''),
        key: 'selection',
    })

    console.log(value)

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
            endDate: selectedRange.endDate ? format(selectedRange.endDate, 'yyyy-MM-dd') : undefined,
        })
        setShow(false)
    }

    const renderValue = () => {
        if (selectedRange && selectedRange.startDate && selectedRange.endDate) {
            return format(selectedRange.startDate, 'dd.MM.yyyy') + ' - ' + format(selectedRange.endDate, 'dd.MM.yyyy')
        }

        return undefined
    }

    return (
        <div
            className={clsx(styles.FormDateRangePicker, props.className, {
                [styles.Invalid]: error.length > 0,
            })}
        >
            {label !== undefined && <label htmlFor={props.id ?? props.name}>{label}</label>}

            <input
                className={styles.Input}
                placeholder={'Algus - Lõpp'}
                readOnly={true}
                value={renderValue()}
                onClick={() => setShow(true)}
            />

            {show && (
                <div className={styles.Container}>
                    <DateRangePicker
                        onChange={onValueChange}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={[selectedRange]}
                        direction={'horizontal'}
                        showDateDisplay={false}
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
                </div>
            )}

            {error?.length > 0 && <div className={styles.ErrorText}>{error}</div>}
        </div>
    )
}

FormDateRangePicker.defaultProps = {
    label: undefined,
    error: '',
    disabled: false,
}

export default FormDateRangePicker
