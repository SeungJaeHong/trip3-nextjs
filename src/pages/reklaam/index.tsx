import React, { Fragment } from 'react'
import Navbar from '../../components/Navbar'
import styles from './AdvertisingPage.module.scss'
import clsx from 'clsx'
import Footer from '../../components/Footer'
import containerStyle from '../../styles/containers.module.scss'
import BackgroundMap from '../../components/BackgroundMap'

const AdvertisingPage = () => {
    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>Reklaam</div>
                </div>
            </div>
            <div className={containerStyle.ContainerLg}>
                <div className={containerStyle.CenteredContainer}>
                    <div className={styles.Body}>
                        <ul>
                            <li>
                                Trip.ee eesmärgiks on pakkuda kõikidele Eesti reisihimulistele keskkonda kogemuste jagamiseks.
                                Reklaamist tulenev raha kulub Trip.ee arendamiseks ning ülevalhoidmiseks.
                            </li>
                            <li>
                                Trip.ee on suurim ja vanim reisiteemaline internetifoorum Eestis.
                                Reisiportaalis Trip.ee reklaamimine on tasuline. Kõik foorumipostitused mis on reklaamihõngulised kustutatakse.
                            </li>
                            <li>
                                Reklaam Trip.ee-s on eksklusiivne.
                                See tähendab seda, et reklaamivõimalusi pakutakse ainult firmadele, kellel on usaldusvääne, kvaliteetne ja huvitav teenus.
                                Firma suurus ei oma seejuures tähtsust.
                            </li>
                            <li>
                                Eelistatud on reisimise ja turismiga seotud reklaamid.
                            </li>
                        </ul>
                        <p>
                            Reklaamisoovid palume saata <strong>reklaam@trip.ee</strong> või <strong>andres@trip.ee</strong>
                        </p>
                    </div>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export default AdvertisingPage
