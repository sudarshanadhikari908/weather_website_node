const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')
console.log(__dirname)
const app = express()
const port = process.env.PORT || 3000
// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sudarshan',
        status: 'Single'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Bachelor',
        name: 'MOther'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sdarshan'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })
        })

    })
})
// res.send({
//     location: req.query.address,
//     temperature: '25',
//     feels_like: 'lazy'
// })

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide search"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Sudarshan',
        errormessage: 'Help article not available not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Sudarshan',
        errormessage: 'Page not found'
    })
})
app.listen(port, () => {
    console.log('Server started correctly in port' + port)
})