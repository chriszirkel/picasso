import fetch from 'node-fetch'

module.exports = {
    getData: async function (params) {
        console.log('CrossFit Workout')

        const url = 'http://comptrain.co/individuals/home/'
        const page = await fetch(url)
        const html = await page.text()

        return html
    }
}
