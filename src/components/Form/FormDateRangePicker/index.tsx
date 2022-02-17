import React, { useState } from 'react'
import styles from './FormDateRangePicker.module.scss'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/et'
import { DateRangePicker } from '@mantine/dates'

// @ts-ignore
const FormDateRangePicker = ({ id, value, required, label, error, onChange, ...props }: props) => {
    const start = value?.startDate ? dayjs(value.startDate).toDate() : null
    const end = value?.endDate ? dayjs(value?.endDate).toDate() : null
    const [dateValue, setDateValue] = useState<[Date | null, Date | null]>([start, end])

    const onValueChange = (value: [Date | null, Date | null]) => {
        setDateValue(value)
        onChange({
            startDate: value[0] ? dayjs(value[0]).format('YYYY-MM-DD') : null,
            endDate: value[1] ? dayjs(value[1]).format('YYYY-MM-DD') : null,
        })
    }

    return (
        <div
            className={clsx(styles.FormDateRangePicker, props.className, {
                [styles.Invalid]: error.length > 0,
            })}
        >
            {label !== undefined && <label htmlFor={props.id ?? props.name}>{label}{required ? <span>*</span> : null}</label>}

            <DateRangePicker
                label={'Vali kuupäeva vahemik'}
                placeholder={'Algus - Lõpp'}
                value={dateValue}
                onChange={onValueChange}
                readOnly={true}
                amountOfMonths={2}
                locale={'et'}
                classNames={{
                    input: styles.Input,
                    label: styles.Label,
                    calendarBase: styles.CalendarBase
                }}
            />

            {error?.length > 0 && <div className={styles.ErrorText}>{error}</div>}
        </div>
    )
}

FormDateRangePicker.defaultProps = {
    label: undefined,
    error: '',
    disabled: false,
    required: false
}

export default FormDateRangePicker
