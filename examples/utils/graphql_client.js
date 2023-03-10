import { GraphQLClient } from 'graphql-request'
// import { getToken } from '@/utils/auth'
const getToken = () => {
  return JSON.parse(localStorage.getItem('shipber_Token'))
}
const endpoint = {
  bff: process.env.VUE_APP_BFF_API_GRAPHQL_URL || 'https://api-bff.stage.shipber.com/graphql'
}

const clientMap = new Map()

const initGraphQLClient = (name) => {
  let client = clientMap.get(name)
  if (!client) {
    const token = getToken()
    client = new GraphQLClient(endpoint[name], {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    clientMap.set(name, client)
  }
  return client
}

export const graphQLClientBff = initGraphQLClient('bff')
