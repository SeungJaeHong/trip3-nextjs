import Navbar from '../Navbar'

type Props = {
    title: string
    children?: JSX.Element | JSX.Element[]
}

const Index = (props: Props) => {
    return (
        <div className="relative p-6 pb-0 overflow-hidden bg-gray-100 lg:px-0 lg:pt-10">
            <div className="max-w-6xl mx-auto inset-0 grid gap-6 lg:mx-auto">
                <div className="pb-10">
                    <Navbar darkMode={true} />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-500 lg:text-5xl pt-4 pb-12">
                    {props.title}
                </h1>
            </div>
        </div>
    )
}

export default Index