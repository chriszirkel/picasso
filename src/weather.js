import fetch from 'node-fetch'

module.exports = {
  getData: async function (params) {
    console.log('Weather params: ', JSON.stringify(params, null, 2))

    let place = ''

    if (params.city) { place = place + params.city + ',' }
    if (params.zipCode) { place = place + params.zipCode + ',' }
    if (params.countryCode) { place = place + params.countryCode }

    const baseUrl = 'http://query.yahooapis.com/v1/public/yql'
    const query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + place + '")'
    const queryUrl = baseUrl + '?q=' + encodeURIComponent(query) + '&format=json'

    console.log('Weather queryUrl: ', queryUrl)

    const page = await fetch(queryUrl)
    const result = await page.json()

    console.log('Weather result: ', JSON.stringify(result, null, 2))

    return result
  }
}
