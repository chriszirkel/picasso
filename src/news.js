import NewsAPI from 'newsapi'

module.exports = {
    getData: async function (params) {
        console.log('News params: ', JSON.stringify(params, null, 2))

        // no params => no result
        if (!params) return

        // source param cannot be mixed with country param
        if (params.sources) {
            params.country = ''
        }

        const newsapi = new NewsAPI(process.env.newsapi_api_key)

        return new Promise((resolve, reject) => {
            newsapi.v2.topHeadlines({
                sources: params.sources,
                q: params.q,
                category: params.category,
                country: params.country,
                pageSize: 5
            }).then(response => {
                console.log('News response: ', JSON.stringify(response, null, 2))

                if (response.status === 'ok') {
                    resolve(response.articles)
                } else {
                    reject(response.message)
                }
            })
        })
    }
}
