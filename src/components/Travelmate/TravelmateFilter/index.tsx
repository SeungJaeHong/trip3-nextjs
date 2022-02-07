import styles from './TravelmateFilter.module.scss'
import FormSelect from '../../Form/FormSelect'
import SubmitButton from '../../Form/SubmitButton'
import React from 'react'
import { Destination, Topic } from '../../../types'
import { getNext12MonthNamesWithYear } from '../../../helpers'

type Props = {
    destinations: Destination[]
    topics: Topic[]
    selectedDestination?: number
    selectedTopic?: number
    onChangeDestination: (id?: number) => void
    onChangeTopic: (id?: number) => void
    selectedAge?: string
    onChangeAge: (id?: string) => void
    selectedGender?: string
    onChangeGender: (id?: string) => void
    selectedStart?: string
    onChangeStart: (id?: string) => void
    onSearch: () => void
}

const TravelmateFilter = ({
    destinations,
    topics,
    selectedDestination,
    selectedTopic,
    onChangeDestination,
    onChangeTopic,
    selectedAge,
    onChangeAge,
    selectedGender,
    onChangeGender,
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

    const ageOptions = [
        { value: '18_29', label: '18 - 29' },
        { value: '30_39', label: '30 - 39' },
        { value: '40_49', label: '40 - 49' },
        { value: '50_59', label: '50 - 59' },
        { value: '60', label: '60+' },
        { value: '', label: 'Pole oluline' },
    ]

    const genderOptions = [
        { value: 'N', label: 'Naine' },
        { value: 'M', label: 'Mees' },
        { value: '', label: 'Pole oluline' },
    ]

    const startOptions = getNext12MonthNamesWithYear()

    return (
        <div className={styles.TravelmateFilter}>
            <div className={styles.Field}>
                <FormSelect
                    id={'country'}
                    options={destinationOptions}
                    placeholder={'Sihtkoht'}
                    value={selectedDestination?.toString()}
                    onChange={(value?: { label: string; value: string }) =>
                        onChangeDestination(value?.value ? parseInt(value.value) : undefined)
                    }
                />
            </div>
            <div className={styles.Field}>
                <FormSelect
                    id={'topic'}
                    options={topicOptions}
                    placeholder={'Reisistiil'}
                    value={selectedTopic?.toString()}
                    onChange={(value?: { label: string; value: string }) =>
                        onChangeTopic(value?.value ? parseInt(value.value) : undefined)
                    }
                />
            </div>
            <div className={styles.Field}>
                <FormSelect
                    id={'Algus'}
                    options={startOptions}
                    placeholder={'Algus'}
                    value={selectedStart}
                    onChange={(value?: { label: string; value: string }) =>
                        onChangeStart(value?.value ? value.value : undefined)
                    }
                />
            </div>
            <div className={styles.Field}>
                <FormSelect
                    id={'age'}
                    options={ageOptions}
                    placeholder={'Vanus'}
                    value={selectedAge}
                    onChange={(value?: { label: string; value: string }) =>
                        onChangeAge(value?.value ? value.value : undefined)
                    }
                />
            </div>
            <div className={styles.Field}>
                <FormSelect
                    id={'gender'}
                    options={genderOptions}
                    placeholder={'Sugu'}
                    value={selectedGender}
                    onChange={(value?: { label: string; value: string }) =>
                        onChangeGender(value?.value ? value.value : undefined)
                    }
                />
            </div>
            <div className={styles.Field}>
                <SubmitButton title={'Otsi'} onClick={onSearch} />
            </div>
        </div>
    )
}

export default TravelmateFilter
