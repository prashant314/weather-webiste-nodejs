const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Prashant'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Prashant'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Prashant',
        message: 'This is a sample message!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location}={}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }  
            console.log(location)
            console.log(forecastData)
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Prashant',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Prashant',
        message: 'Page not found'
    })
})

// Start the server
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})