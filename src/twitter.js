import Twit from 'twit'

module.exports = {
    getData: async function (params) {
        console.log('Twitter params: ', JSON.stringify(params, null, 2))

        // no params => no result
        if (!params) return

        const twitter = new Twit({
            consumer_key: process.env.twitter_consumer_key,
            consumer_secret: process.env.twitter_consumer_secret,
            app_only_auth: true
        })

        return new Promise((resolve, reject) => {
            twitter.get('statuses/user_timeline', { screen_name: params.screen_name, user_id: params.user_id, count: 5 }, (err, data, response) => {
                if (err) {
                    console.log('Twitter error: ', JSON.stringify(err, null, 2))
                    reject(err)
                } else {
                    console.log('Twitter response: ', JSON.stringify(data, null, 2))
                    resolve(data)
                }
            })
        })
    }
}
