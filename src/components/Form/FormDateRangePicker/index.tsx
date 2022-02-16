import React, { useState } from 'react'
import styles from './FormDateRangePicker.module.scss'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/et'
import { DateRangePicker } from '@mantine/dates'

// @ts-ignore
const FormDateRangePicker = ({ id, value, label, error, onChange, ...props }: props) => {
    const start = dayjs(value.startDate).toDate()
    const end = dayjs(value.endDate).toDate()
    const [dateValue, setDateValue] = useState<[Date | null, Date | null]>([start, end])

    const onValueChange = (value: [Date | null, Date | null]) => {
        setDateValue(value)
        onChange({
            startDate: dayjs(value[0]).format('YYYY-MM-DD'),
            endDate: dayjs(value[1]).format('YYYY-MM-DD'),
        })
    }

    return (
        <div
            className={clsx(styles.FormDateRangePicker, props.className, {
                [styles.Invalid]: error.length > 0,
            })}
        >
            {label !== undefined && <label htmlFor={props.id ?? props.name}>{label}</label>}

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
}

export default FormDateRangePicker
