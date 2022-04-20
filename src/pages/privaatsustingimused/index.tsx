import React, { Fragment } from 'react'
import Navbar from '../../components/Navbar'
import styles from './PrivacyTerms.module.scss'
import clsx from 'clsx'
import Footer from '../../components/Footer'
import containerStyle from '../../styles/containers.module.scss'
import BackgroundMap from '../../components/BackgroundMap'

const PrivacyTermsPage = () => {
    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>Privaatsustingimused</div>
                </div>
            </div>
            <div className={containerStyle.ContainerLg}>
                <div className={styles.Body}>
                    <p>
                        Trip.ee kogub ja töötleb ainult neid isikuandmeid, mida kasutajad meiega vabatahtlikult jagavad.
                        Kasutaja annab isikuandmete töötlemise nõusoleku kasutajaks registreerimisel tehes märke
                        &quot;Nõustun ma kasutajatingimustega ja privaatsuspoliitikaga&quot; välja juurde. Järgnevalt selgitame
                        kuidas Trip.ee kogub, töötleb ja kasutab kasutajate andmeid.
                    </p>
                    <h3>Andmed mida me kogume ja töötleme</h3>
                    <ul>
                        <li>
                            <strong>E-mail</strong>
                            <p>
                                Trip.ee kasutajaks registreerimisel on kohustuslik e-maili aadress. E-mail on oluline,
                                et saaksime saata kasutajale parooli ning vajatusel parooli meeldetuletuse või muid
                                kasutaja poolt tellitud e-maile. Samuti võime kasutada e-maili aadressi teavitamaks
                                kasutajat olulistest muudatustest Trip.ee keskkonnas.
                            </p>
                        </li>
                        <li>
                            <strong>Kasutajanimi ja profiiliinfo</strong>
                            <p>
                                Registreerimisel sisestatud kasutajanimi on kohustuslik eristab kasutajaid ning on
                                unikaalne. Kasutaja võib oma profiili lisada ka täiendavaid andmeid: täisnime, omale
                                sobivat profiilipilti sihtkohti mida kasutaja on külastanud või soovib külastada,
                                kodulehekülje aadressi, Instagrami aadressi, Facebooki aadressi ja Twitteri aadressi.
                                Kasutaja poolt sisestatud profiiliinfot (sünniaasta, sugu) kasutatakse ka reisikaaslase
                                kuulutuse juures.
                            </p>
                        </li>
                        <li>
                            <strong>Informatsioon sotsiaalvõrkudest</strong>
                            <p>
                                Kui sa otsustad registreerida ennast Trip.ee kasutajaks läbi Google või Facebooki, siis
                                annad sa meile nõusoleku kasutada sinu avalikku profiiliinfot sotsiaalvõrgus: nime,
                                e-maili ning profiilipilti.
                            </p>
                        </li>
                        <li>
                            <strong>Kasutaja postitused ning kommentaarid</strong>
                            <p>
                                Trip.ee kogub kasutaja poolt lisatud postitusi, lisatud pilte ning kommentaare koos
                                lisatud sihtkoha ning valdkonna täägidega. Andmeid postituste, kommentaaride, ning
                                külastatud riikide kohta kasutame kasutajatele erijärgu andmiseks (algaja / edasijõudnud
                                reisija jne).
                            </p>
                        </li>
                        <li>
                            <strong>Kasutaja poolt meeldib/ei meeldi märked</strong>
                            <p>
                                Igale postitusele ja kommentaarile saab registreeritud kasutaja teha märmke, kas
                                postitus meeldib või mitte. Sellega tunnustad või ei tunnust teiste postitusi või
                                kommentaare. Kasutame märkmeid et näidata postituste ja kommentaaride koondhinnanguid.
                                Me ei näita teistele kasutajatele milline kasutaja millise märkme andis.
                            </p>
                        </li>
                        <li>
                            <strong>Privaatsõnumid</strong>
                            <p>
                                Trip.ee kogub kasutajate omavahelisi sõnumeid. Need andmed on nähtavad vaid sõnumi
                                saatjale ning vastuvõtjale, Trip.ee sõnumeid ei töötle.
                            </p>
                        </li>
                        <li>
                            <strong>Kasutajasessioon</strong>
                            <p>
                                Hoiame brauseris krüpteeritud cookie&apos;t mis identifitseerib kasutaja ning suurendab
                                kasutajamugavust: iga külastuse puhul ei tule ennast uuesti sisse logida. Seda saab
                                kontrollida logimislehel seadistusega &quot;Pea mu logimine meeles&quot;.
                            </p>
                        </li>
                        <li>
                            <strong>Kasutajaks registreerimise aeg</strong>
                            <p>
                                Me salvestame aja millal kasutaja end Trip.ee liikmeks registeeris. Kasutame seda infot
                                erijärgu andmiseks (algaja / edasijõudnud reisija jne).
                            </p>
                        </li>
                        <li>
                            <strong>Kasutaja viimane sisselogimine</strong>
                            <p>
                                Me salvestame aja millal kasutaja end viimati Trip.ee&apos;sse sisse logis. Sisselogimisaja
                                abil saame vajadusel paluda kasutaja profiiliandmete uuendamist -- Trip.ee ei kasuta ega
                                töötle aegunud isikuandmeid.
                            </p>
                        </li>
                        <li>
                            <strong>Kasutaja IP aadress</strong>
                            <p>
                                Iga külastuse puhul salvestame logifailidesse kasutaja IP aadressi, selle abil saame
                                trip.ee teha turvalisemaks ja kaitsta seda võimalike rünnakute eest. IP aadressi me ei
                                töötle (ei tee kindlaks kasutaja asukohta vms).
                                <br />
                                IP aadressi salvestame ka siis kui kasutaja pole sisse loginud ning vaatab mõnda
                                postitust: selle abil saame garanteerida korrektse ja unikaalse postituste vaatamise
                                statistika.
                            </p>
                        </li>
                        <li>
                            <strong>Reklaamid</strong>
                            <p>
                                Klikkides Trip.ee keskkonnas olevatel reklaamidel võivad reklaamijad koguda andmeid
                                kasutaja profiili kohta. Trip.ee ei jaga ühegi kasutaja infot reklaamijatele ja ei kogu
                                isikuandmeid käitumusliku reklaami pakkumise eesmärgil.
                            </p>
                        </li>
                        <li>
                            <strong>Kasutaja poolt e-mailile tellitud teated</strong>
                            <p>
                                Kasutaja soovil saadame tema e-mailile iganädalase uudiskirja, teda huvitavate
                                piirkondadega seotud lennupakkumisi, teateid tema postitusele lisatud kommentaaridest
                                ning teateid temale saadetud privaatsõnumitest. Kõik e-maili teated on vabatahtlikud
                                ning kasutaja saab seadistada, milliseid teateid ta soovib saada.
                            </p>
                        </li>
                        <li>
                            <strong>Isikuandmete kolmandatele isikutele edastamine</strong>
                            <p>
                                Me ei edasta Trip.ee kasutajate andmeid kolmandatele isikutele ja riigiasutustele, va
                                juhul kui andmete küsijal on selle jaoks õiguslik alus vastavalt kehtivatele seadustele.
                            </p>
                        </li>
                        <li>
                            <strong>Andmete turvalisus</strong>
                            <p>
                                Trip.ee teenuse käigus kogutud isikuandmeid hoitakse DigitalOcean serverites, mis asuvad
                                Euroopa Liidu liikmesriigi territooriumil ning juurdepääs isikuandmetele on ainult
                                Trip.ee poolt volitatud töötajatel, kes saavad isikuandmetega tutvuda vaid selleks, et
                                lahendada Trip.ee teenuse kasutamisega seonduvaid probleeme.
                            </p>
                        </li>
                        <li>
                            <strong>Andmete eksport</strong>
                            <p>
                                Kasutaja võib soovi korral paluda oma andmete eksporti (allalaadimist), selleks palume
                                võtta ühendust <strong>abi@trip.ee</strong>
                            </p>
                        </li>
                        <li>
                            <strong>Andmete kustutamine</strong>
                            <p>
                                Kasutaja võib soovi korral paluda oma lisatud sisu või oma profiiliinfo kustutamiseks,
                                selleks palume võtta ühendust <strong>abi@trip.ee</strong>
                            </p>
                        </li>
                        <li>
                            <strong>Lisainfo</strong>
                            <p>
                                Lisainfo ja küsimuste puhul palun võtke ühendust <strong>abi@trip.ee</strong>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export default PrivacyTermsPage
