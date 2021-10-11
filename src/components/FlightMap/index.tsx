import {useEffect} from "react";

const FlightMap = (props: any) => {
    useEffect(() => {
       console.log('Flight map init')
    }, [])

    return (
        <div>
            Flight Map
        </div>
    )
}

export default FlightMap