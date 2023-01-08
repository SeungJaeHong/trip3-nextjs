import React, { Fragment } from 'react'
import Footer from '../../../components/Footer'
import containerStyle from '../../../styles/containers.module.scss'
import styles from './AirbalticCampaignPage.module.scss'
import { NextSeo } from 'next-seo'
import Header from "../../../components/Header";
import Link from "next/link";

const AirbalticCampaignPage = () => {
    return (
        <Fragment>
            <NextSeo
                title={'Trip.ee | airBaltic kampaania'}
                description={'Trip.ee | airBaltic kampaania'}
                openGraph={{
                    title: 'Trip.ee | airBaltic kampaania',
                }}
            />
            <Header backgroundImage={'/images/airbaltic_bg.webp'}>
                <div className={styles.Title}>
                    Osale AirBaltic kampaanias ja võida 2 piletit valitud sihtkohta
                </div>
            </Header>

            <div className={containerStyle.ContainerLg}>
                <div className={styles.Body}>
                    <h2>Auhind:</h2>
                    <div className={styles.Block}>
                        <ul>
                            <li>
                                2 lennupiletit koos äraantava pagasiga airBalticu edasi-tagasi otselennule algusega Tallinnast võitja poolt valitud sihtkohta.
                            </li>
                            <li>
                                Valida saab kõikide airBalticu otselendude vahel, mis algavad Tallinnast.
                            </li>
                        </ul>
                    </div>

                    <h2>Loosis osalemise tingimused:</h2>
                    <div className={styles.Block}>
                        <ul>
                            <li>
                                Auhinnamängu, mis kestab 10.01 - 17.01.2023, korraldab reisiportaal Trip.ee koostöös airBalticuga.
                            </li>
                            <li>
                                Auhinnaks on airBalticu edasi-tagasi lennupiletid otselendudele algusega Tallinnast
                                kahele koos äraantava pagasiga (kuni 23kg).
                            </li>
                            <li>
                                Auhinnamängus osalevad kõik perioodil 10.01 - 17.01.2023 Trip.ee Facebooki lehel loosimängus osalenud isikud.<br/>
                                <div className={styles.Requirements}>Osalemise tingimused:</div>
                                <ol>
                                    <li className={styles.Requirement}>
                                        Märgi <a href="https://www.facebook.com/tripeeee/posts/6905903886146636" target="_blank" rel={"noreferrer noopener"}>kampaaniapakkumise</a> kommentaaridesse airBalticu otselennu sihtkoht Tallinnast kuhu lennata soovid.
                                    </li>
                                    {/*<li>
                                        <span className="AirBaltic__listCounter">1.</span>
                                        <span className="AirBaltic__requirements">Märgi <a href="https://www.facebook.com/tripeeee/posts/6748675615202798" target="_blank" className="AirBaltic__campaignLink">kampaaniapakkumise</a> kommentaaridesse kellega koos sa sinna puhkama soovid lennata.</span>
                                    </li>*/}
                                    <li className={styles.Requirement}>
                                        Märgi kellega koos sa sinna puhkama soovid lennata.
                                    </li>
                                    {/*<li>
                                        <span className="AirBaltic__listCounter">2.</span><span className="AirBaltic__requirements">Pane "Like" Trip.ee Facebook lehele.</span>
                                    </li>*/}
                                    <li className={styles.Requirement}>
                                        Jaga kampaaniapakkumist ka avalikult oma sõpradele.
                                    </li>
                                </ol>
                            </li>
                            <li>
                                Võitja nimi avaldatakse <a href="https://www.facebook.com/tripeeee" target="_blank" rel={"noreferrer noopener"} >Trip.ee Facebooki lehel</a> 18.01.2023
                                ning võitja peab võtma Tripiga ühendust kas siis läbi Facebooki sõnumite või e-meilitsi aadressil turundus@trip.ee hiljemalt 28.02.2023.
                            </li>
                            <li>
                                Kui võitjaga ei õnnestu ühendust saada hiljemalt 31.01.2023, ei ole Trip.ee kohustatud
                                auhinda väljastama.
                            </li>
                        </ul>
                    </div>

                    <h2>Auhinna tingimused:</h2>
                    <div className={styles.Block}>
                        <ul>
                            <li>
                                Auhinnaks on kinkevautšer, mis sisaldab 1×2 edasi-tagasi lennupiletit koos äraantava
                                pagasiga Tallinnast airBalticu lennule.
                            </li>
                            <li>
                                Lennupiletid tuleb ära kasutada perioodil 01.02.2023 - 30.04.2023. Sellesse perioodi
                                peavad jääma lennud mõlemas suunas. Lennupiletid tuleb ära kasutada ühe tervikuna,
                                st reisides kahekesi koos. Vähemalt üks kahest reisijast peab olema täiskasvanu.
                            </li>
                            <li>
                                Soovitud kuupäevade kinnitamise võimalus sõltub vabade kohtade olemasolust.
                            </li>
                            <li>
                                Auhinnaks saadud lennud toimuvad airBalticu poolt opereeritud otselendudel
                                Tallinnast vastavalt airBalticu kehtivale lennuplaanile.
                            </li>
                            <li>
                                Auhinnaks saadud lennupileteid ei või edasi müüa ning auhinna väärtust ei maksta
                                välja rahas.
                            </li>
                            <li>
                                Auhinnaks saadud lennupiletite eest ei saa koguda airBalticu klubi punkte.
                            </li>
                            <li>
                                Kehtiva passi või ID-kaardi ning vajadusel piisava kattega reisikindlustuse
                                hankimise kohustus lasub võitjal.
                            </li>
                            <li>
                                Reisiga seonduvad võimalikud lisakulud kannab võitja.
                            </li>
                            <li>
                                Auhinnamängus ei saa osaleda Tripi toimetuse liikmed.
                            </li>
                            <li>
                                Kõik tarbijamängust tulenevad vaidlused lahendatakse vastavalt Eesti Vabariigi
                                seadusandlusele.
                            </li>
                        </ul>
                    </div>

                    <div className={styles.ActionBtn}>
                        <Link href="https://www.facebook.com/tripeeee/posts/6905903886146636" passHref>
                            <a target={"_blank"} rel={"noreferrer noopener"} className={styles.Button} >
                                <span>Osalemiseks klikka siia</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export default AirbalticCampaignPage
