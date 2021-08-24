import styles from './TravelmateFilter.module.scss'
import FormSelect from '../../Form/FormSelect'

const TravelmateFilter = (props: any) => {
    return (
        <div className={styles.TravelmateFilter}>
            <div className={styles.Field}>
                <FormSelect id={'country'} options={[]} placeholder={'Riik'} />
            </div>
            <div className={styles.Field}>
                <FormSelect id={'city'} options={[]} placeholder={'Linn'} />
            </div>
            <div className={styles.Field}>
                <FormSelect id={'topic'} options={[]} placeholder={'Reisistiil'} />
            </div>
            <div className={styles.Field}>
                <FormSelect id={'age'} options={[]} placeholder={'Vanus'} />
            </div>
            <div className={styles.Field}>
                <FormSelect id={'gender'} options={[]} placeholder={'Sugu'} />
            </div>
        </div>
    )
}

export default TravelmateFilter