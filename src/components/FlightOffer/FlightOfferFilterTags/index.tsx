import styles from './FlightOfferFilterTags.module.scss'
import clsx from "clsx"

type Props = {
    tags: {id: number, name: string}[]
    selected?: Array<number>
    onSelect: (id: number) => void
}

const FlightOfferFilterTags = ({tags, selected, onSelect}: Props) => {
    return (
        <div className={styles.FlightOfferFilterTags}>
            {tags.map(tag => {
                return (
                    <div className={clsx(styles.Tag, {
                        [styles.Selected]: selected?.includes(tag.id)
                    })} key={tag.id} onClick={() => onSelect(tag.id)}>
                        <span className={styles.Title}>{tag.name}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default FlightOfferFilterTags