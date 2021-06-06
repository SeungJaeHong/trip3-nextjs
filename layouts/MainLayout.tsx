import Head from 'next/head'
import Footer from "../components/Footer"

const MainLayout = (props: any) => {
    return (
        <>
            <Head>
                <title>{props.component?.title || 'Trip.ee'}</title>
            </Head>
            {props.children}
            <Footer simple={props.component?.simpleFooter || false} />
        </>
    )
}

export default MainLayout