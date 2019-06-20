const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(__filename)

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath= path.join(__dirname, "../public")
const viewsDirPath= path.join(__dirname, "../templates/views")
const partialsDirPath= path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')   // default is views folder
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sequence Inc.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sequence Inc.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helptext: 'You can enter city or place to get the weather forecast!',
        name: 'Sequence Inc.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({error: 'You must provide a search location (ie. city, address or a place)!'})     
    }
    console.log(req.query.location)
    
    geocode(req.query.location, (error, {latitude, longitude, location}={}) => {
        console.log(error)
        if (error) {
            return res.send({error})     

        }
    
        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            } 
    
            res.send({
               location,
               latitude,
               longitude,
               forecast: forecastData,
               search: req.query.location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({error: 'You must provide a search term!'})     
    }

    console.log(req.query.search)
    res.send({products: []})
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404 Page',
        errormsg: 'Help article not found',
        name: 'Sequence Inc.'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404 Page',
        errormsg: 'Page not found',
        name: 'Sequence Inc.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})