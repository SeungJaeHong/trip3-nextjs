import React, { useRef, useEffect } from 'react'
import { GeoJSON } from 'react-leaflet'
import * as topojson from 'topojson-client'
import europeData from '../../../public/data/continent/europe.json'
import asiaData from '../../../public/data/continent/asia.json'
import africaData from '../../../public/data/continent/africa.json'
import northAmericaData from '../../../public/data/continent/north-america.json'
import southAmericaData from '../../../public/data/continent/south-america.json'
import centralAmericaData from '../../../public/data/continent/central-america.json'
import oceaniaData from '../../../public/data/continent/oceania.json'
import middleEastData from '../../../public/data/continent/middle-east.json'
import { Destination } from '../../types'

type Props = {
    destination: Destination
}

export default function DestinationMapContinentLayer({ destination }: Props) {
    const layerRef = useRef(null)

    // @ts-ignore
    function addData(layer, jsonData) {
        if (jsonData.type === 'Topology') {
            for (let key in jsonData.objects) {
                let geojson = topojson.feature(jsonData, jsonData.objects[key])
                layer.addData(geojson)
            }
        } else {
            layer.addData(jsonData)
        }
    }

    useEffect(() => {
        const layer = layerRef.current
        switch (destination.id) {
            case 1:
                addData(layer, europeData)
                break
            case 2:
                addData(layer, asiaData)
                break
            case 3:
                addData(layer, middleEastData)
                break
            case 4:
                addData(layer, africaData)
                break
            case 5:
                addData(layer, northAmericaData)
                break
            case 6:
                addData(layer, centralAmericaData)
                break
            case 7:
                addData(layer, southAmericaData)
                break
            case 8:
                addData(layer, oceaniaData)
                break
        }
    }, [])

    // @ts-ignore
    return <GeoJSON ref={layerRef} />
}
