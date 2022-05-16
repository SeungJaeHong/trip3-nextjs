import React, { Fragment } from 'react'
import Navbar from '../../components/Navbar'
import styles from './TermsOfService.module.scss'
import clsx from 'clsx'
import Footer from '../../components/Footer'
import containerStyle from '../../styles/containers.module.scss'
import BackgroundMap from '../../components/BackgroundMap'
import { NextSeo } from 'next-seo'

const TermsOfServicePage = () => {
    return (
        <Fragment>
            <NextSeo
                title={'Trip.ee | Kasutustingimused'}
                openGraph={{
                    title: 'Kasutustingimused',
                }}
            />
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>Kasutustingimused</div>
                </div>
            </div>
            <div className={containerStyle.ContainerLg}>
                <div className={styles.Body}>
                    <p>
                        Trip.ee on normaalne kogemustevahetamise keskkond normaalsetele reisihuvilistele inimestele.
                        Mine vihka pagulasi, homosid, juute ja puukallistajaid kusagil mujal. Siin räägitakse
                        reisimisest.
                    </p>
                    <p>
                        Nagu kõikides foorumites, saad ka siin seda, mida küsid. Palun kasuta Trip.ee otsingut ja tutvu
                        olemasolevate teemadega, sest väga paljudele küsimustele leiab asjalikud vastused juba
                        olemasolevatest teemadest.
                    </p>
                    <p>
                        Palun kasuta postitustes ilusat emakeelt. Meid on siin maamunal niigi vähe ja Trip.ee võiks olla
                        see koht, kus eesti keelt ei solgita. See tähendab näiteks seda, et kahe lause vahel on tühik
                        ning kohanimed ja laused algavad suure tähega. Pole ju nii keeruline või mida sulle seal koolis
                        õpetatigi?
                    </p>
                    <p>
                        Enne kui teed uue teema, vaata, kas selle kohta pole mõnda vanemat teemat. Ära karda oma
                        küsimust postitada mõne vanema teema alla. Nii teed tulevastel otsijatel elu palju lihtsamaks.
                    </p>
                    <p>
                        Reklaamiga on meil nii, et ärikasutajatega sõlmime omaette kokkulepped. Kui tahad aga eraisikuna
                        teada anda mõnest huvitavast reisimisega seotud asjast, siis kirjuta abi@trip.ee ja võimalik, et
                        teeme sulle ise reklaami.
                    </p>
                    <p>
                        Trip.ee-s avaldatavaid tekste ei tuleks käsitleda ajakirjandusena. Kui tahad teada 7 räpasest
                        saladusest, millest stjuardessid sulle ei räägi või missugused 10 asja peavad kindlasti sinu
                        reisikohvris olema, siis on tõesti parem oma uudishimu kusagil mujal rahuldada.
                    </p>
                    Paar tehnilist nüanssi ka:
                    <ul>
                        <li>
                            Trip.ee ei jaga kasutajate isikuandmeid, välja arvatud kui see on eelnevalt eraldi välja
                            toodud (näiteks kampaaniate või auhinnamängude puhul).
                        </li>
                        <li>
                            Trip.ee keskkond kasutab küpsiseid (cookies) andmete salvestamiseks sinu arvutisse. Need ei
                            sisalda sinu kirjutatut Trip.ee-s, vaid kiirendavad keskkonna kasutamist. Sinu e-posti
                            aadressi kasutatakse ainult registreerimise kinnitamiseks, parooli saatmiseks ununemise
                            korral, uudiskirja saatmiseks ning privaatsõnumitest teavitamiseks (seda saab kasutaja
                            profiilist soovi korral välja lülitada).
                        </li>
                        <li>
                            Trip.ee-l on õigus kasutajate poolt keskkonda postitatud materjale taaskasutada ja jagada.
                        </li>
                        <li>
                            Trip.ee-sa avaldatud materjale võib refereerida kuni veerandi mahu ulatuses. Kui materjali
                            on refereeritud suuremas mahus, on OÜ-l Trip.ee õigus küsida selle eest tasu 200 eurot.
                            Trip.ee-s avaldatud materjalide kasutamisel mujal massimeedias tuleb nimetada allikat ja
                            viidata (linkida) originaalmaterjalile refereeritud artikli esimeses lõigus.
                        </li>
                        <li>
                            Trip.ee-l on õigus kasutajate postitusi arusaadavuse huvides toimetada ning
                            kasutustingimustele mittevastavad või teemaga mitteseotud postitused kustutada.
                        </li>
                        <li>
                            Trip.ee toimetuse liikmetel on on õigus kommentaaride ja postituste eemaldamine foorumist
                            kui postitus ei sobi foorumisse või läheb foorumireeglitega vastuollu.
                        </li>
                    </ul>
                    <p>
                        Usume, et normaalsetele inimestele rohkem ettekirjutusi teha polegi vaja. Kes neid ikka lugeda
                        viitsib. Parem naudi ja jaga oma kogemusi!
                    </p>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export default TermsOfServicePage
