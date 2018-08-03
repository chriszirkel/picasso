// import fetch from 'node-fetch'
import YQL from 'yql'

module.exports = {
    getData: async function (params) {
        console.log('Weather params: ', JSON.stringify(params, null, 2))

        // no params => no result
        if (!params) return

        /* default values
        {
            "zipCode": "55128",
            "cityName": "Mainz",
            "countryCode": "DE"
        }
        */

        const place = Object.values(params).join()
        const query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + place + '") and u="c"'
        const yql = new YQL(query)

        return new Promise((resolve, reject) => {
            yql.exec(function (err, data) {
                if (err) {
                    console.log('Weather error: ', JSON.stringify(err, null, 2))
                    reject(err)
                } else {
                    console.log('Weather response: ', JSON.stringify(data, null, 2))
                    resolve(data.query.results.channel)
                }
            })
        })
    }
}
