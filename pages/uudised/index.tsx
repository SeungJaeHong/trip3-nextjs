import React, {Fragment} from 'react'
import Header from "../../components/Header"

function NewsIndex() {
    return (
        <Fragment>
            <Header title={'Uudised'} />
            <div className="container mx-auto">
                <div className="h-96 pt-12 text-2xl text-center text-gray-600">
                    Uudised
                </div>
            </div>
        </Fragment>
    )
}

//NewsIndex.title = 'Uudised'

export default NewsIndex