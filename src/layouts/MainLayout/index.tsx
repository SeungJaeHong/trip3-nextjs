import React from 'react'
import Infobar from '../../components/Infobar'

type Props = {
    children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
    return (
        <>
            {/*<Infobar>
                <a href={'#'}>
                    Vaata kõiki <u>Musta Reede</u> pakkumisi SIIT
                </a>
            </Infobar>*/}
            {children}
        </>
    )
}

export default MainLayout
