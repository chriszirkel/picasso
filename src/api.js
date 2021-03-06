import API from 'claudia-api-builder'
import { DynamoDB } from 'aws-sdk'
import weather from './weather'
import twitter from './twitter'
import news from './news'

const dynamodb = new DynamoDB({apiVersion: '2012-08-10'})
const api = new API({requestFormat: 'AWS_PROXY'})

async function handler (request) {
    let body = {}
    let serviceApi = null
    let serviceId = request.path.substr(1)
    let params = request.queryStringParameters

    if (params === null) {
        params = await getDefaultParams(serviceId)
    }

    console.log('ServiceId: ', serviceId)

    if (serviceId === 'weather') {
        serviceApi = weather
    } else if (serviceId === 'twitter') {
        serviceApi = twitter
    } else if (serviceId === 'news') {
        serviceApi = news
    }

    if (serviceApi !== null) {
        body = await serviceApi.getData(params)
    }

    return {
        statusCode: 200,
        body: body
    }
}

async function getDefaultParams (serviceId) {
    var dynamodbParams = {
        Key: {
            'serviceId': {
                S: serviceId
            }
        },
        TableName: 'picasso-services'
    }

    console.log('DynamoDB params: ', JSON.stringify(dynamodbParams, null, 2))

    return new Promise((resolve, reject) => {
        dynamodb.getItem(dynamodbParams, function (err, data) {
            if (err) {
                console.log('DynamoDB error: ', JSON.stringify(err, null, 2), err.stack)
                reject(err)
            } else {
                console.log('DynamoDB result: ', JSON.stringify(data, null, 2))
                const params = JSON.parse(data.Item.params.S)
                resolve(params)
            }
        })
    })
}

api.get('/weather', handler)
api.get('/twitter', handler)
api.get('/news', handler)

module.exports = api
