import React, {Fragment} from 'react'
import Header from "../../components/Header"

function TravelmatesIndex() {
    return (
        <Fragment>
            <Header title={'Reisikaaslased'} />
            <div className="container mx-auto">
                <div className="h-96 pt-12 text-2xl text-center text-gray-600">
                    Reisikaaslased
                </div>
            </div>
        </Fragment>
    )
}

//TravelmatesIndex.title = 'Reisikaaslased'

export default TravelmatesIndex