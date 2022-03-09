import styles from './TravelmateFilter.module.scss'
import FormSelect from '../../Form/FormSelect'
import SubmitButton from '../../Form/SubmitButton'
import React from 'react'
import { Destination, Topic } from '../../../types'

type Props = {
    destinations: Destination[]
    topics: Topic[]
    startOptions: {value: string, label: string}[]
    selectedDestination?: number
    selectedTopic?: number
    onChangeDestination: (id?: number) => void
    onChangeTopic: (id?: number) => void
    selectedStart?: string
    onChangeStart: (id?: string) => void
    onSearch: () => void
}

const TravelmateFilter = ({
    destinations,
    topics,
    startOptions,
    selectedDestination,
    selectedTopic,
    onChangeDestination,
    onChangeTopic,
    selectedStart,
    onChangeStart,
    onSearch,
}: Props) => {
    const destinationOptions: { value: string; label: string }[] = destinations.map((destination: Destination) => ({
        label: destination.name,
        value: destination.id.toString(),
    }))
    const topicOptions: { value: string; label: string }[] = topics.map((topic: Topic) => ({
        label: topic.name,
        value: topic.id.toString(),
    }))

    return (
        <div className={styles.TravelmateFilter}>
            <div className={styles.Field}>
                <FormSelect
                    id={'destination'}
                    options={destinationOptions}
                    placeholder={'Sihtkoht'}
                    value={selectedDestination?.toString()}
                    onChange={value => {
                        onChangeDestination(value? parseInt(value) : undefined)
                    }}
                />
            </div>
            <div className={styles.Field}>
                <FormSelect
                    id={'topic'}
                    options={topicOptions}
                    placeholder={'Reisistiil'}
                    value={selectedTopic?.toString()}
                    onChange={value =>
                        onChangeTopic(value ? parseInt(value) : undefined)
                    }
                />
            </div>
            <div className={styles.Field}>
                <FormSelect
                    id={'start'}
                    options={startOptions}
                    placeholder={'Algus'}
                    value={selectedStart}
                    onChange={(value?: string) => {
                        onChangeStart(value ?? undefined)
                    }}
                />
            </div>
            <div className={styles.Button}>
                <SubmitButton title={'Otsi'} onClick={onSearch} />
            </div>
        </div>
    )
}

export default TravelmateFilter
