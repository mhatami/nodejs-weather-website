const request = require('request')

const geocode = (address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWhhdGFtaSIsImEiOiJjandpOWs0YTQyMGJxNGFxcnJ2bTM1ejViIn0.Ef1B4pvDBKPYkZCf4drt2w&limit=1'
    console.log(url)

    request({url, json:true}, (error, {body}) => {    
        if (error) {
            callback("System Error. Unable to connetc to location services!", undefined)
        } else if (body.features.length === 0) {
            callback("Wrong search term. Unable to find the location.", undefined)
        } else {
            callback (undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name                
            })
        }
    })    
}

module.exports = geocode