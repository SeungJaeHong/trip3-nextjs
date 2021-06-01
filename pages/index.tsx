import Image from 'next/image'
import {useUser} from "../context/AuthContext"
import React, {Fragment} from 'react'
import Navbar from "../components/Navbar"
import SearchIcon from "../components/icons/SearchIcon";

const Home = () => {
    const user = useUser()

    return (
        <Fragment>
            <div className="relative p-6 pb-14 overflow-hidden bg-gray-700 lg:px-0 lg:pt-10"
                 style={{
                     backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(/images/bg.jpg)",
                     width: "100%",
                     backgroundRepeat: "no-repeat",
                     backgroundSize: "cover",
                     backgroundPosition: "50% 50%"
                }}>
                <div className="max-w-screen-xl inset-0 grid gap-11 lg:mx-auto">
                    <div className="pb-10">
                        <Navbar />
                    </div>
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
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto">
                <div className="p-12">
                    user: { JSON.stringify(user) }
                </div>

                <div className="pb-12">
                    <Image
                        src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt="Picture of the author"
                        width={1024}
                        height={600}
                        layout={'responsive'}
                    />
                </div>
                <div className="pb-12">
                    <Image
                        src="https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt="Picture of the author"
                        width={1024}
                        height={600}
                        layout={'responsive'}
                    />
                </div>
                <div className="pb-12">
                    <Image
                        src="https://images.pexels.com/photos/4496782/pexels-photo-4496782.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt="Picture of the author"
                        width={1024}
                        height={600}
                        layout={'responsive'}
                    />
                </div>
                <div className="pb-12">
                    <Image
                        src="https://images.pexels.com/photos/286763/pexels-photo-286763.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt="Picture of the author"
                        width={1024}
                        height={600}
                        layout={'responsive'}
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default Home
