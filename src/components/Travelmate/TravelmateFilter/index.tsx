import styles from './TravelmateFilter.module.scss'
import FormSelect from '../../Form/FormSelect'

const TravelmateFilter = (props: any) => {
    return (
        <div className={styles.TravelmateFilter}>
            <div className={styles.Field}>
                <FormSelect
                    id={'country'}
                    options={[]}
                    placeholder={'Riik'}
                    onChange={(value: any) => console.log(value)} />
            </div>
            <div className={styles.Field}>
                <FormSelect id={'city'} options={[]} placeholder={'Linn'} onChange={(value: any) => console.log(value)} />
            </div>
            <div className={styles.Field}>
                <FormSelect id={'topic'} options={[]} placeholder={'Reisistiil'} onChange={(value: any) => console.log(value)} />
            </div>
            <div className={styles.Field}>
                <FormSelect id={'age'} options={[]} placeholder={'Vanus'} onChange={(value: any) => console.log(value)} />
            </div>
            <div className={styles.Field}>
                <FormSelect id={'gender'} options={[]} placeholder={'Sugu'} onChange={(value: any) => console.log(value)} />
            </div>
        </div>
    )
}

export default TravelmateFilter