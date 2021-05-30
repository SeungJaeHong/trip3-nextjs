import Image from 'next/image'
import {useUser} from "../context/AuthContext"

const Home = () => {
    const user = useUser()

    return (
        <div className="container mx-auto">
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
    )
}

export default Home
