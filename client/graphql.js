import ApolloClient, { gql } from 'apollo-boost';

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean
  }
  extend type Mutation {
    login: Boolean
  }
`

const resolvers = {
  Query: {

  },
  Mutation: {
    login: (parent, args, { cache }) => {
      cache.writeData({ data: { isLoggedIn: true } })
      return true
    }
  }
}

const client = new ApolloClient({
  uri: 'http://35.223.53.125:4000',
  resolvers,
  typeDefs
});

client.writeData({ data: { isLoggedIn: false } })


export default client