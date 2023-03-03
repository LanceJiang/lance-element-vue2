import { gql } from 'graphql-request'

/* // 获取当前用户
export const BffGetMe = gql`
  query {
    me {
      brandUserId
      brandId
      userId
      role
      email
      firstname
      lastname
      address
      company
      mobile
      brand {
        id
        name
        title
        companyName
        domain
        employeeNumber
        logo {
          small
          medium
          mediumReversed
          favicon
        }
        owner {
          brandUserId
          brandId
          userId
          role
          email
          firstname
          lastname
          address
          company
          mobile
          name
        }
      }
      name
    }
  }
`

export const BffBrandMembers = gql`
  query ($first: Int, $offset: Int, $query: QueryBrandMembersInput) {
    brandMembers(first: $first, offset: $offset, query: $query) {
      nodes {
        brandUserId
        brandId
        userId
        role
        email
        firstname
        lastname
        address
        company
        mobile
        brand {
          id
          name
          title
          logo {
            small
            medium
            mediumReversed
            favicon
          }
        }
        name
      }
    }
  }
`

export const transactionBff = gql`
  query (
    $first: Int
    $offset: Int
    $query: QueryTransactionsInput
    $sortKey: TransactionSortKey
    $reverse: Boolean
  ) {
    transactions(
      first: $first
      offset: $offset
      query: $query
      sortKey: $sortKey
      reverse: $reverse
    ) {
      totalCount
      nodes {
        id
        transactionNumber
        eventType
        eventNum
        eventName
        balance {
          value
          currency
        }
        amount {
          value
          currency
        }
        transactedAt
        remark
        invoiceNumbers
        member {
          brandUserId
          brandId
          userId
          role
          email
          firstname
          lastname
          address
          company
          mobile
          name
        }
      }
    }
  }
` */

// tabs item字段
const tab = `
  id
  #brandId
  #userId
  tabName
  tabIndex
  name
  key
  columns
  filters
  isLocked
  querySettings
`
// tabs 列表请求
export const savedSearches = gql`
  query ($query: QuerySavedSearchesInput) {
    savedSearches(query: $query) {
      nodes {
       ${tab}
      }
    }
  }
`

// tabs 列表排序更新
export const savedSearchTabIndexUpdate = gql`
  mutation ($ids: [ID!]) {
    savedSearchTabIndexUpdate(ids: $ids) {
      nodes {
        ${tab}
      }
    }
  }
`

// tabs item创建
export const savedSearchCreate = gql`
  mutation (
    $tabName: String = ""
    $tabIndex: Int! = 0
    $name: String = ""
    $key: String! = ""
    $columns: String = ""
    $filters: String = ""
    $querySettings: String = ""
    $isLocked: Boolean! = false
  ) {
    savedSearchCreate(
      tabName: $tabName
      tabIndex: $tabIndex
      name: $name
      key: $key
      columns: $columns
      filters: $filters
      querySettings: $querySettings
      isLocked: $isLocked
    ) {
      ${tab}
    }
  }
`

// tabs item更新
export const savedSearchUpdate = gql`
  mutation (
    $id: ID!
    $tabName: String
    $tabIndex: Int
    $name: String
    $key: String!
    $columns: String
    $filters: String
    $querySettings: String
    $isLocked: Boolean! = false
  ) {
    savedSearchUpdate(
      id: $id
      tabName: $tabName
      tabIndex: $tabIndex
      name: $name
      key: $key
      columns: $columns
      filters: $filters
      querySettings: $querySettings
      isLocked: $isLocked
    ) {
      ${tab}
    }
  }
`

// tabs item删除
export const savedSearchDelete = gql`
  mutation ($ids: [ID!]) {
    savedSearchDelete(ids: $ids)
  }
`
