const request = require('request')
const forecast = (lati, lang, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9bd84da3f0ea93ddcfc0ac4467f14a82&query=' + encodeURIComponent(lang) + ',' + encodeURIComponent(lati) + '&units=f'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to network', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, "The temperature is" + body.current.temperature + "It feels like" + body.current.feelslike

                + "The summary is" + body.current.weather_descriptions[0] + "The humidity is" + body.current.humidity


            )
        }
    })


    //     }
    //     else if (response.body.error) {
    //         console.log('Unable to find Location')

    //     } else {
    //         console.log("it is currently" + response.body.current.temperature + "feels like" + response.body.current.feelslike + "% chance of rain")
    //         console.log(response.body.current.weather_descriptions[0])
    //     }
    // })

}
module.exports = forecast