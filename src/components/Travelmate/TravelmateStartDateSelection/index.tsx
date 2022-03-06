import styles from './TravelmateStartDateSelection.module.scss'
import React from 'react'
import clsx from 'clsx'

type Props = {
    id: string
    value?: string
    options: {value: string, label: string}[]
    onChange: (option: string) => void
    disabled: boolean
}

const TravelmateStartDateSelection = ({ value, onChange, options }: Props) => {
    return (
        <div className={styles.SelectionContainer}>
            {options.map((option) => {
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
