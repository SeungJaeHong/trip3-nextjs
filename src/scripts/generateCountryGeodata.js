const fs = require('fs');
const data = JSON.parse(fs.readFileSync('../../public/data/custom.geo.json'));
const facts = JSON.parse(fs.readFileSync('../../public/data/country_facts.json'));

const getCountryId = (iso2) => {
    const res = facts.filter(f => f.country_code2 === iso2 && f.type === 'country')
    return res.length === 1 ? res[0].id : ''
}

data.features.map((d, i) => {
    const id = getCountryId(d.properties.iso_a2)
    d.properties = {
        'id': id,
        'name': d.properties.name,
        'iso2': d.properties.iso_a2,
        'iso3': d.properties.iso_a3,
    }
})

fs.writeFileSync('../../public/data/country_geodata.json', JSON.stringify(data));
