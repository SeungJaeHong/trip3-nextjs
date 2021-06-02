import styles from './FrontPageSearch.module.scss'
import SearchIcon from "../../icons/SearchIcon";

type Props = {
    //title: string
    //children?: JSX.Element | JSX.Element[]
}

const Index = (props: Props) => {
    return (
        <div className="flex text-center relative w-1/2 mx-auto mb-14">
            <div className="w-full relative">
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="Kuhu sa täna tahaksid minna?"
                    className="w-full h-14 bg-white bg-opacity-20 placeholder-white text-xl pt-1 pl-14 text-white outline-none" />
                <div className="pl-2 pt-1 absolute top-3 left-1 cursor-pointer fill-white fill-current text-white">
                    <SearchIcon width={'26'} height={'26'}/>
                </div>
            </div>
        </div>
    )
}

export default Index