import styles from './TravelmateFilter.module.scss'
import FormSelect from '../../Form/FormSelect'
import SubmitButton from '../../Form/SubmitButton'
import React from 'react'

const TravelmateFilter = () => {
    return (
        <div className={styles.TravelmateFilter}>
            <div className={styles.Field}>
                <FormSelect
                    id={'country'}
                    options={[]}
                    placeholder={'Sihtkoht'}
                    onChange={(value: any) => console.log(value)}
                />
            </div>
            <div className={styles.Field}>
                <FormSelect
                    id={'topic'}
                    options={[]}
                    placeholder={'Reisistiil'}
                    onChange={(value: any) => console.log(value)}
                />
            </div>
            <div className={styles.Field}>
                <FormSelect
                    id={'Algus'}
                    options={[]}
                    placeholder={'Algus'}
                    onChange={(value: any) => console.log(value)}
                />
            </div>
            <div className={styles.Field}>
                <FormSelect
                    id={'age'}
                    options={[]}
                    placeholder={'Vanus'}
                    onChange={(value: any) => console.log(value)}
                />
            </div>
            <div className={styles.Field}>
                <FormSelect
                    id={'gender'}
                    options={[]}
                    placeholder={'Sugu'}
                    onChange={(value: any) => console.log(value)}
                />
            </div>
            <div className={styles.Field}>
                <SubmitButton title={'Otsi'} />
            </div>
        </div>
    )
}

export default TravelmateFilter
