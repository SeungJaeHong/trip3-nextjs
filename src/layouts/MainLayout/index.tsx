import React from 'react'
import Infobar from '../../components/Infobar'
import Link from 'next/link'

type Props = {
    children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
    return (
        <>
            <Infobar>
                <Link href={'/odavad-lennupiletid/trip-ee-uelevaade-black-friday-kampaaniatest'}>
                    <a>
                        Vaata kõiki <u>Musta Reede</u> pakkumisi SIIT
                    </a>
                </Link>
            </Infobar>
            {children}
        </>
    )
}

export default MainLayout
