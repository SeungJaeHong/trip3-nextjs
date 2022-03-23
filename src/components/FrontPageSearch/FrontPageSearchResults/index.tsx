import styles from './FrontPageSearchResults.module.scss'
import PinIcon from "../../../icons/PinIcon";
import TicketsIcon from "../../../icons/TicketsIcon";
import CommentIcon from "../../../icons/CommentIcon";
import ArrowRightIcon from "../../../icons/ArrowRightIcon";

type Props = {
    results: []
}

const FrontPageSearchResults = ({results}: Props) => {

    return (
        <div className={styles.FrontPageSearchResults}>
            <div className={styles.ResultBlock}>
                <PinIcon />
                <div className={styles.Results}>
                    <div className={styles.CategoryTitle}>
                        Sihtkohad
                    </div>
                    <div className={styles.ResultList}>
                        <div className={styles.ResultRow}>
                            Poola, Euroopa
                        </div>
                        <div className={styles.ResultRow}>
                            Türgi, Euroopa
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.ResultBlock}>
                <TicketsIcon />
                <div className={styles.Results}>
                    <div className={styles.CategoryTitle}>
                        Lennupakkumised
                    </div>
                    <div className={styles.ResultList}>
                        <div className={styles.ResultRow}>
                            Edasi-tagasi lennupiletid Tallinnast Madeirale (+ öö 3* hotellis) alates 179€
                        </div>
                        <div className={styles.ResultRow}>
                            Otselennud suveks: edasi-tagasi lennupiletid Tallinnast Rooma al 45€
                        </div>
                        {/*<div className={styles.ResultRow}>
                            Otselennud suveks Itaaliasse: edasi-tagasi Riiast Veneetsiasse al 17€
                        </div>*/}
                    </div>
                </div>
            </div>
            <div className={styles.ResultBlock}>
                <CommentIcon />
                <div className={styles.Results}>
                    <div className={styles.CategoryTitle}>
                        Foorum
                    </div>
                    <div className={styles.ResultList}>
                        <div className={styles.ResultRow}>
                            Süljest PCR test Klaipeda/Palanga piirkonnas?
                        </div>
                        <div className={styles.ResultRow}>
                            Ühe doosiga vaktsineeritute reisimine
                        </div>
                        <div className={styles.ResultRow}>
                            Tallinna lennujaamas hetke olukord
                        </div>
                        <div className={styles.ResultRow}>
                            Sihtriigi reeglid
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.MoreResults}>
                <span>Kõik tulemused(2270)</span>
                <ArrowRightIcon />
            </div>
        </div>
    )
}

export default FrontPageSearchResults