const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url='https://api.darksky.net/forecast/01107e584ab1c8d4e84309515ec492b5/'+ encodeURIComponent(latitude)+','+ encodeURIComponent(longitude)+'?units=si'
    console.log(url)

    request({url, json:true}, (error, {body}) => {    
        if (error) {
            callback("System Error. Unable to connetc to location services!", undefined)
        } else if (body.error === 0) {
            callback("Wrong search term. Unable to find the location.", undefined)
        } else {
            callback (undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out with minimum " + body.daily.data[0].temperatureMin + " degrees and maximum " + body.daily.data[0].temperatureMax + " degrees. There is " + body.currently.precipProbability *100 + "% chance of rain")
        }
    })
}


module.exports = forecast