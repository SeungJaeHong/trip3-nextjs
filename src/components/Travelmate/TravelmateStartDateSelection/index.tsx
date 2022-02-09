import styles from './TravelmateStartDateSelection.module.scss'
import React from 'react'
import { getNext12MonthNamesWithYear } from '../../../helpers'
import clsx from 'clsx'

type Props = {
    id: string
    value?: string
    onChange: (option: string) => void
    disabled: boolean
}

const TravelmateStartDateSelection = ({ value, onChange }: Props) => {
    const startOptions = getNext12MonthNamesWithYear()
    return (
        <div className={styles.SelectionContainer}>
            {startOptions.map((option) => {
                return (
                    <div
                        className={clsx(styles.Selection, {
                            [styles.Selected]: option.value === value,
                        })}
                        key={option.value}
                        onClick={() => onChange(option.value)}
                    >
                        {option.label}
                    </div>
                )
            })}
        </div>
    )
}

TravelmateStartDateSelection.defaultProps = {
    disabled: false
}

export default TravelmateStartDateSelection
