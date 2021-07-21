import styles from "./BackgroundMap.module.scss"
//import MapIcon from "../../icons/MapIcon";

const BackgroundMap = () => {
    return (
        <div className={styles.BackgroundMap}>
            <div className={styles.Icon}>
               {/* <MapIcon />*/}
                <img src={'/images/map.svg'} alt={''} />
            </div>
        </div>
    )
}

export default BackgroundMap