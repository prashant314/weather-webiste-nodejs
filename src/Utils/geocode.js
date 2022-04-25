const request = require('request')

const geoCode = (address, callback) => {
    const url = 'http://open.mapquestapi.com/geocoding/v1/address?key=MX446hZfa9BFgROGxaHBLvAQCNzYOwfQ&location=' + encodeURIComponent(address) + '&maxResults=1';
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.results[0].locations.length === 0) {
            callback('Unable to find location! Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng,
                location: body.results[0].locations[0].adminArea5
            })
        }
        
    })
}

module.exports = geoCode