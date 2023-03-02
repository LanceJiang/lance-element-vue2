import { GraphQLClient } from 'graphql-request'
// import { getToken } from '@/utils/auth'
const getToken = () => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InphY2suemh1QDRwbC5wbHVzIiwidXNlcklkIjozLCJicmFuZFVzZXJJZCI6OCwiYnJhbmRJZCI6Miwibmlja25hbWUiOiJ6YWNrLnpodSIsInJvbGVJZCI6MiwiaWF0IjoxNjc3NzQwMjA1LCJleHAiOjE2Nzc4MjY2MDV9.ziSIoALHonsKT1kHhDTJkEN900TBh3LBekZcc80a1O4'
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
