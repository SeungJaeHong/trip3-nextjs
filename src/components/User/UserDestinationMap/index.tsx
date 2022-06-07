import { geoPath, geoMercator, select } from 'd3'
import mapData from '../../../../public/data/country_geodata.json'
import { useEffect, useRef } from 'react'
import { Destination } from '../../../types'

type Props = {
    selectedCountries?: Destination[]
    selectedCities?: Destination[]
}

const UserDestinationMap = ({selectedCountries, selectedCities}: Props) => {
    const svgRef = useRef(null)
    const wrapperRef = useRef(null)

    useEffect(() => {
        const svg = select(svgRef.current)

        // @ts-ignore
        const { width, height } = wrapperRef.current.getBoundingClientRect() || { width: 700, height: 450 }
        const projection = geoMercator()
            // @ts-ignore
            .fitSize([width, height - 10], mapData)
            //.scale(700 / 2 / Math.PI)
            .rotate([-11, 0])
            //.translate([(width) / 2, height * 1.35 / 2])
            .precision(0.1)

        // takes geojson data,
        // transforms that into the d attribute of a path element
        const pathGenerator = geoPath().projection(projection)

        const fillSelected = (feature: any) => {
            if (selectedCountries) {
                const country = selectedCountries.filter(c => c.id === feature.properties.id)
                if (country && country.length === 1) {
                    return '#FFFFFF'
                }
            }

            return '#288f18'
        }

        // render each country
        svg.selectAll('.country')
            .data(mapData.features)
            .join('path')
            .attr('class', 'country')
            //.attr("stroke", "blue")
            .transition()
            //.attr("fill", feature => colorScale(feature.properties[property]))
            .attr('fill', (feature) => fillSelected(feature))
            // @ts-ignore
            .attr('d', (feature) => pathGenerator(feature))

        if (selectedCities) {
            selectedCities.map(dest => {
                return (
                    svg.append('circle')
                        // @ts-ignore
                        .attr('cx', (d) => projection([dest.lng, dest.lat])[0])
                        // @ts-ignore
                        .attr('cy', (d) => projection([dest.lng, dest.lat])[1])
                        .attr('r', 2)
                        .attr('fill', '#FF9A3E')
                )
            })
        }
    }, [])

    return (
        <div ref={wrapperRef}>
            <svg ref={svgRef} />
        </div>
    )
}

export default UserDestinationMap
