import Head from 'next/head'
import Footer from "../Footer";
import Header from "../Header";

const MainLayout = (props: any) => {
    return (
        <div>
            <Head>
                <title>{props.component?.title || 'Trip.ee'}</title>
            </Head>
            <Header title={props.component.title} />
            {props.children}
            <Footer />
        </div>
    )
}

export default MainLayout