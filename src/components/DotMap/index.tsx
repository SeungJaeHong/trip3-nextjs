import React, {useEffect} from "react"
import {Destination} from "../../types"
import DottedMapIcon from "../../icons/DottedMapIcon"

type Props = {
    destination: Destination
}

const DotMap = ({destination}: Props) => {
    useEffect(() => {
        console.log('DotMap init')
    }, [])

    return (
        <div>
            <DottedMapIcon />
        </div>
    )
}

export default DotMap