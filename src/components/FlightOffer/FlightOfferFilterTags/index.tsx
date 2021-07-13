import styles from './FlightOfferFilterTags.module.scss'
import clsx from "clsx"

const FlightOfferFilterTags = () => {

    const tags = [
        {
            id: 1,
            name: 'Soojale maale',
            selected: false
        },
        {
            id: 2,
            name: 'Suurlinn',
            selected: false
        },
        {
            id: 3,
            name: 'Rannapuhkus',
            selected: true
        },
        {
            id: 4,
            name: 'Talvepuhkus',
            selected: false
        },
        {
            id: 5,
            name: 'Koolivaheaeg',
            selected: false
        },
        {
            id: 6,
            name: 'Eksootiline',
            selected: false
        },
        {
            id: 7,
            name: 'Aafrika',
            selected: false
        },
        {
            id: 8,
            name: 'Aasia',
            selected: false
        },
        {
            id: 9,
            name: 'Ameerika',
            selected: false
        },
        {
            id: 10,
            name: 'Euroopa',
            selected: true
        },
        {
            id: 11,
            name: 'Veahind',
            selected: false
        },
    ]

    return (
        <div className={styles.FlightOfferFilterTags}>
            {tags.map(tag => {
                return (
                    <div className={clsx(styles.Tag, {
                        [styles.Selected]: tag.selected
                    })} key={tag.id}>
                        <span className={styles.Title}>{tag.name}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default FlightOfferFilterTags