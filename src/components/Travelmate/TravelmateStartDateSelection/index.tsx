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
    const seasons = options.slice(0, 4)
    return (
        <div className={styles.SelectionContainer}>
            <div className={styles.Options}>
                {seasons.map((option) => {
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
            <div className={styles.Separator} />
            <div className={styles.Options}>
                {options.map((option, index) => {
                    if (index > 3) {
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
                    }
                })}
            </div>
        </div>
    )
}

TravelmateStartDateSelection.defaultProps = {
    disabled: false
}

export default TravelmateStartDateSelection
