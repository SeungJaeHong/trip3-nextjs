import React, { Fragment } from 'react'
import Navbar from '../../components/Navbar'
import styles from './WhatIsTrip.module.scss'
import clsx from 'clsx'
import Footer from '../../components/Footer'
import containerStyle from '../../styles/containers.module.scss'
import BackgroundMap from '../../components/BackgroundMap'
import { NextSeo } from 'next-seo'

const WhatIsTripPage = () => {
    return (
        <Fragment>
            <NextSeo
                title={'Trip.ee | Mis on Trip.ee?'}
                openGraph={{
                    title: 'Mis on Trip.ee?',
                }}
            />
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>Mis on Trip.ee?</div>
                </div>
            </div>
            <div className={containerStyle.ContainerLg}>
                <div className={styles.Body}>
                    <p>
                        Eesti vanim ja suurim reisiportaal Trip.ee nägi ilmavalgust 1998. aastal, kui kaks
                        reisihuvilisest sõpra Kristjan ja Tom otsustasid püsti panna lehe, kus reisisellid saavad
                        kogemusi vahetada.
                    </p>
                    <p>
                        Suurema hoo sai Trip.ee sisse 2000-ndate algul, kui värskelt Eesti turule sisenenud Lufthansa
                        pakkus supersoodsaid pileteid lendudele Lõuna-Ameerikasse. Ühtäkki avastasid paljud, et
                        Tšiilisse või Kolumbiasse reisimisest pole pääsu. Kuna infot nappis, tundus sel ajal iga
                        infokild kulla hinnaga.
                    </p>
                    <p>
                        2004 aastal hakkas Trip.ee reisifoorum samm-sammult võtma sellist ilmet, nagu seda täna võib
                        näha. Samal ajal said hoo sisse paketireisid Egiptusesse ja foorumisse tekkisid esimesed
                        asukohaeksperdid. Sellesse aega jäävad ka mitmed tulised verbaalsed võitlused. Tänaseks on Eesti
                        reisisellid jõudud ära käia pea igas maailma nurgas ja aina vähemaks jääb riike, mille kohta
                        infot Trip.ee-s napib.
                    </p>
                    <h4>Mis asja Trip.ee ajab?</h4>
                    Trip.ee tegijate põhimõtted on aja jooksul jäänud üsna samasuguseks:
                    <ul>
                        <li>Trip.ee soovib olla Eestis kõige parem reisiinfot vahendav allikas;</li>
                        <li>info tuleb kõige otsesemast allikast ehk reisijalt reisijale;</li>
                        <li>hoiame kindlat kvaliteeditaset nii uudistes kui reisfoorumis;</li>
                        <li>reklaamita ei saa, kuid peame sellega piiri;</li>
                        <li>peame lugu eesti keelest.</li>
                    </ul>
                    <h4>Kas Trip.ee on ainult iseseisvalt reisivatele inimestele?</h4>
                    Ei, kaugeltki mitte. Trip.ee-s jagatakse kogemusi ka valmisreise puudutavates küsimustes.
                    <h4>Kui populaarne Trip.ee on?</h4>
                    Aina populaarsem. Rekordnädalal oleme saanud üle 50 000 unikaalse külastuse, keskmiselt vaadatakse
                    meid umbes 40 000 korda nädalas. Trip.ee registreeritud kasutajaid on kokku 50 000 ümber.
                    <h4>Kes Trip.ee-d teevad?</h4>
                    Trip.ee toimib suurel määral tänu paljude inimeste fanatismile. Foorumis pidevalt asjalikku reisinõu
                    jagavad inimesed on kutsutud osalema Trip.ee toimetuses. Toimetuse liikmed, kelle tunneb ära nende
                    pildil oleva rohelise riba järgi, hoiavad silma peal foorumil, koos arutatakse läbi ka tähtsamad
                    Trip.ee-d puudutavad otsused. Kokku on Trip.ee toimetuses paarkümmend liiget.
                    <br />
                    Lisaks toimetusele on Trip.ee-l olemas ka inimesed, kes hoolitsevad igapäevaselt sisu lisamise eest.
                    Reisiuudiste kirjutamine on Veigo õlgadel, parimaid lendude sooduspakkumisi leiab Mihkel.
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export default WhatIsTripPage
