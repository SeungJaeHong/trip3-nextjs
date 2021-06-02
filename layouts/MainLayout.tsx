import Head from 'next/head'
import Index from "../components/Footer"

const MainLayout = (props: any) => {
    return (
        <>
            <Head>
                <title>{props.component?.title || 'Trip.ee'}</title>
            </Head>
            {props.children}
            <Index />
        </>
    )
}

export default MainLayout