import React, {Fragment} from 'react'
import Header from "../../components/Header";

function FlightsIndex() {
    return (
        <Fragment>
            <Header title={'Lennupakkumised'}/>
            <div className="container mx-auto">
                <div className="h-96 pt-12 text-2xl text-center text-gray-600">
                    Lennupakkumised
                </div>
            </div>
        </Fragment>
    )
}

//FlightsIndex.title = 'Lennupakkumised'

export default FlightsIndex