import React, { Fragment } from 'react'
import Navbar from '../../components/Navbar'
import styles from './ErrorPricePage.module.scss'
import clsx from 'clsx'
import Footer from '../../components/Footer'
import containerStyle from '../../styles/containers.module.scss'
import BackgroundMap from '../../components/BackgroundMap'

const ErrorPricePage = () => {
    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>Mis on veahind?</div>
                </div>
            </div>
            <div className={containerStyle.ContainerLg}>
                <div className={styles.Body}>
                    <h3>Mis on veahind?</h3>
                    <p>
                        Veahind (ingl. keeles error fare või mistake fare) on ebatavaliselt soodne lennupilet teatavate linnapaaride vahel ja/või mõne mugavusklassi kohta.
                        Piletid võivad olla nii A-B-A, kuid tõenäolisemalt mõni open-jaw variantidest, kus lend algab ühest linnast, tagasilennuga teise linna (A-B-C) või
                        tagasilennuga teisest lennujaamast (A-B,C-A) või ka A-B,C-D. Veahinnad ei puuduta ainult lennufirmasid, vaid ka hotelle.
                    </p>
                    <h3>Kas kõik soodsad hinnad on veahinnad?</h3>
                    <p>Ei ole. Lennufirmad pakuvad küllalt tihti soodsaid hindu teatavate linnapaaride vahel.
                        Näiteks on Finnairil kombeks pakkuda Saksamaalt või Poolast Aasia-lendudele tunduvalt soodsamaid pileteid,
                        kui algusega Tallinnast või Helsingist. Tihti saab hinda märgatavalt soodsamaks ka <i>open-jaw</i> lendude puhul.
                    </p>
                    <h3>Miks veahinnad tekivad?</h3>
                    <div>Lennufirmad avaldavad iga päev tohutus koguses hindu, sest kasumi maksimeerimiseks kasutatakse dünaamilist ehk ajas muutuvat hinnastamist.
                        Teiseks sisaldavad paljud lennureisid lendamist mitme erineva lennufirmaga.
                        Seetõttu pole ime, et aeg-ajalt lipsavad sisse ka mõned vead. Laias laastus jagunevad veahinnad kolmeks:
                        <ol>
                            <li>
                                Vead valuuta konverteerimisel
                                <p>
                                    Selline viga tekib, kui numbriline hind on õige, kuid valuutakurss on jäänud sisestamata või on vale.
                                    Näiteks alustades Taanist lendu, mis peaks kokku maksma 550 eurot, kuid hind antakse Taani krooni põhjal, kujuneb lennu maksumuseks 73 eurot.
                                    Bangkokis oli sellise vea tõttu võimalik peatuda 1935 USD maksvas Conradi hotelli presidendisviidis 51 dollari eest, sest hind anti ekslikult Tai bahtides.
                                    Valuuta konverteerimisega seonduvad vead tekivad sagedamini, kui tegemist on mitme lennufirma lennuga, mis kasutavad erinevaid valuutasid.
                                </p>
                            </li>
                            <li>
                                Eksimine kümnendkohaga
                                <p>
                                    Võimalik, et siia kategooriasse langeb ka Etihadi <a href={'/odavad-lennupiletid/veahind-etihadiga-moskva-peking-wellington-uus-meremaa-peterburi'}>näide</a>, kus suur ringreis maksis 2060 euro asemel 206 eurot (kuigi hindu näidati rublades).
                                </p>
                            </li>
                            <li>
                                Unustatakse lisamata mõni hinnakomponent
                                <p>
                                    Tekib siis, kui lisatakse põhihind, kuid jääb ära kütuse lisatasu ja/või maksud või kõik maksud ja lisatasud on olemas, kuid süsteemi on jäänud lisamata lennupileti põhihind.
                                </p>
                            </li>
                        </ol>
                    </div>
                    <h3>Kuidas käituda, kui satud veahinna otsa?</h3>
                    <p className={styles.LessMB}>
                        Esimene reegel on reageerida võimalikult kiiresti. Veahinnad võivad kaduda minutite või tundidega, kuigi on nähtud ka veahindu, mis on saadaval mitmeid päevi.
                        Seetõttu sobivad veahinnad eelkõige neile, kes on oma reisiplaanides paindlikud.
                        Need ei ole hinnad, kus saab hakata oma suguseltsi läbi helistama ja siis homme-ülehomme kogunete reisivõimalusi arutama. Veelkord: veahind on kiiretele.
                    </p>
                    <p className={styles.LessMB}>
                        Teine reegel on mitte helistada veahinda pakkuvasse lennufirmasse või oma reisiagendile.
                        Selle ainuke tulemus on see, et info veahinnast jõuab lennufirmani ja apsakas parandatakse kiirelt ära.
                        Tihti on veahinnad broneeritavad ainult mingi broneerimisootori ühe riigi lehel (näiteks Itaalia, Taani jne) ja pole mujal nähtavad, muutes reisiagendi sekkumise mõttetuks.
                    </p>
                    <p className={styles.LessMB}>
                        Siit jõuame tõdemuseni, et veahinnad on neile, kellel on olemas piisava limiidiga krediitkaart.
                        Kui sul pole krediitkaarti ja sa pole suuteline iseseisvalt lennupileteid broneerima, siis sorry, veahinnad pole sinu teema.
                    </p>
                    <p>
                        Arvestada tuleb ka seda, et mitte keegi ei hakka sulle sobivate reisikuupäevadega lende otsima.
                        Nii mõneski otsingumootoris on võimalus otsida lende +/- 1,2,3 kuupäevaga.
                        Sinu eest on niigi 95% tööd ära tehtud ja viriseda, et mulle sobivat kuupäevakombinatsiooni ei leidu, on liiast.
                    </p>
                    <h3>Kuidas veahindu leida?</h3>
                    <p>
                        Veahinnad levivad põhiliselt erinevates reisi- ja lennukommuunides.
                        Trip.ee kogub pidevalt infot erinevatelt lehtedelt ja postitab häid hindu võimalikult kiiresti.
                        Kõigepealt jõuab info Trip.ee <a href={'/odavad-lennupiletid'}>lennupakkumiste</a> alla, mõnevõrra hiljem Trip.ee <a href={'https://www.facebook.com/tripeeee'} target={'_blank'} rel={'noreferrer'}>Facebooki</a> lehele.
                    </p>
                    <h3>Mida ma veel veahindade kohta teadma pean?</h3>
                    <p className={styles.LessMB}>
                        Veahinnaga pileti ostmine ei tähenda automaatselt, et pilet ongi kohe olemas.
                        Universaalseid reegleid pole, kuid eri lennufirmad võivad käituda erinevalt.
                        On lennufirmasid, kes austavad tehtud vigu ja on neid, kes teatavad, et vea tõttu kantakse raha tagasi.
                    </p>
                    <p>
                        Kõige tõenäolisem, et veahinnaga ostetud pilet tühistatakse, on USA lennufirmade puhul.
                        Euroopa lennufirmad on loterii, kuid ostetud pileteid pigem austatakse, Lähis-Ida lennufirmad on vast kõige kindlamad.
                        Igal juhul pole lend enne kindel, kui lennufirmast või broneerimislehelt pole kinnitust ja süsteemis on konkreetne broneering olemas.
                    </p>
                    <p>
                        Kokkuvõte: veahinnaga pileteid ostes kaasneb alati risk, et ostetud pilet tühistatakse.
                        Tavaliselt selgub see, kas lennufirma(d) veahinnaga müüdud lennupileteid aktsepteerivad või mitte, paari nädala jooksul.
                        Seni, kuni lennufirma otsus pole teada, ei tasuks hakata broneerima muid reisiteenuseid (hotellid, jätkulennud jne).
                    </p>
                    <h3>Kuidas suhtub veahinda kindlustus?</h3>
                    <p className={styles.LessMB}>
                        Kulude hüvitamine sõltub iga kindlustusseltsi tingimustest, kuid siinjuures tuleb tähele panna mitut olulist nüanssi.
                        Üldjuhul on seltside tingimustes enne lepingu jõustumist teatud ajaperiood (tavaliselt 48-72h) ja enne selle perioodi lõppemist kindlustuskaitset ei ole.
                        Näiteks kui ostad täna veahinnaga piletid koos reisi ärajäämise kaitsega ja lennufirma teatab järgmisel päeval, et neid pileteid ei austata,
                        siis ei ole seltsi tingimustes sätestatud ajaperiood (nt 72h) täis ning seltsil ei ole hüvitamistkohustust.
                        Samas on jällegi lisatingimuste (nt lennufirma töötajate streik, mis tavapoliisi puhul ei rakendu) rakendamiseks olemas ka vastupidine klausel,
                        et mõne lisakaitse (nt lennufirma töötajate streik) rakendamiseks peab olema kindlustusleping sõlmitud 48h jooksul peale lennupiletite ostmist.
                    </p>
                    <p className={styles.LessMB}>
                        Teine nüanss on see, et enamike Eestis tegutsevate seltside tingimustes loetakse üldjuhul lennu ärajäämiseks seda kui lend jääb ära tehnilistel põhjustel
                        või ilmastikuolude tõttu. Võibolla kõikidel seltsidel see nii tingimustes sätestatud ei ole, kuid kui on, siis võiks eeldada,
                        et veahinnaga piletid ei ole tehniline põhjus ega ka ilmastikust tulenev põhjus.
                        Seega võiks eeldada, et tegemist ei ole kindlustusjuhtumiga ning hüvitamiskohustust ei ole.
                    </p>
                    <p>
                        Kolmas nüanss on teoreetiline - turutingimustes oluliselt madalama hinnaga soetatud piletite puhul ei ole nende tühistamine tõenäoliselt ettenägematu
                        sündmus vaid võib eeldada, et kindlustusvõtja pidi olema teadlik sellise lennupileti tühistamise suurest tõenäosusest ja kui kindlustusvõtja nägi seda ette,
                        siis ei ole tegemist kindlustusjuhtumiga. See oleks ilmselt selline õigusteoreetiline vaidlus, mille tulemus selguks ilmselt alles kohtus.
                    </p>
                    <h3>Kui tihti veahindu esineb?</h3>
                    <p>
                        Seda ei tea tegelikult keegi, sest paljud veahinnad parandatakse ära enne, kui nad laiemalt teatavaks saavad.
                        Aga tõeliselt ahvatlevaid veahindu esineb paar korda aastas.
                    </p>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export default ErrorPricePage
