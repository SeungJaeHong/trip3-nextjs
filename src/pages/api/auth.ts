import {NextApiRequest, NextApiResponse} from "next"
import SessionClient from "../../lib/SessionClient"
import {LoggedInUser} from "../../types"

type Data = {
    user: LoggedInUser|null
}

//todo: do we even need the proxy ?

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    console.log(req.headers, 'proxy request HEADERS')

    try {
        const response = await SessionClient.get('/api/user', {
            headers: {
                Accept: 'application/json',
                Cookie: req.headers.cookie,
                Referer: 'http://localhost:3000'
            }
        })

        const data = response.data

        //console.log(response.headers, 'RES HEaders')
        //console.log(response.headers['set-cookie'], 'COOKIE')

        //console.log(data, 'SUCCESS')

        const newCookie = response.headers['set-cookie']
        res.setHeader('Set-Cookie', newCookie)
        res.status(200).json(data)
    } catch (e: any) {
        console.log('error2')
        //throw e
        res.status(401).json({user: null})
    }

    //console.log(data.status)
    //const flights = await ApiClient.get('/flights/latest')
    //res.status(200).json({name: 'John Doe'})
}