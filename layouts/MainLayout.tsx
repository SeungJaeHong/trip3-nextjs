import Head from 'next/head'

const MainLayout = (props: any) => {
    return (
        <div className="Layout">
            <Head>
                <title>Test title</title>
            </Head>
            {props.children}
        </div>
    )
}

export default MainLayout