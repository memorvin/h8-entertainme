const { ApolloServer, makeExecutableSchema } = require('apollo-server');

const user = require('./schemas/user')
const movie = require('./schemas/movie')
const show = require('./schemas/show')

const typeDefs = `
  type Query
  type Mutation
`

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, user.typeDefs, movie.typeDefs, show.typeDefs],
  resolvers: [user.resolvers, movie.resolvers, show.resolvers]
})

const server = new ApolloServer({ schema });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});