import React, { useEffect, useState } from 'react'
import { Destination } from '../../types'
import { GeoJSON, MapContainer, Marker, TileLayer } from 'react-leaflet'
import mapData from '../../../public/data/country_geodata.json'

type Props = {
    destination: Destination
}

const DotMap = ({ destination }: Props) => {
    const [geoJsonData, setGeoJsonData] = useState<any>(undefined)
    const mapCreated = (map: any) => {
        const country = mapData.features.filter((f) => f.properties.id === destination.id)
        let mapBounds = undefined
        if (country && country.length === 1) {
            setGeoJsonData(country[0])
            if (country[0].geometry.type === 'Polygon') {
                mapBounds = country[0].geometry.coordinates.flat().map((coordinates) => {
                    return [coordinates[1], coordinates[0]]
                })
            } else {
                mapBounds = country[0].geometry.coordinates
                    .flat()
                    .map((coordinates) => {
                        return coordinates.map((c) => {
                            // @ts-ignore
                            return [c[1], c[0]]
                        })
                    })
                    .flat()
            }
        } else {
            setGeoJsonData(undefined)
            if (destination.lat && destination.lng) {
                mapBounds = [[destination.lat, destination.lng]]
            }
        }

        if (mapBounds) {
            map.fitBounds(mapBounds)
        }

        let zoom = map.getZoom() - 1
        if (!country.length) {
            zoom = 4
        }

        map.setZoom(zoom)
    }

    useEffect(() => {
        setGeoJsonData(undefined)
    }, [destination])

    const renderContent = () => {
        if (geoJsonData) {
            return <GeoJSON key={'geo_' + destination.id} data={geoJsonData} />
        } else if (destination.lat && destination.lng) {
            return <Marker position={{ lat: destination.lat, lng: destination.lng }} />
        }

        return null
    }

    return (
        <MapContainer
            id={'map_' + destination.id}
            zoom={3}
            scrollWheelZoom={false}
            //bounds={bounds}
            //minZoom={1}
            /*boundsOptions={{
                padding: [100, 100],
            }}*/
            key={destination.id}
            whenCreated={mapCreated}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {renderContent()}
        </MapContainer>
    )
}

export default DotMap
