const axios = require('axios')
const { gql } = require('apollo-server');

const typeDefs = gql`
  extend type Query {
    user(_id: ID!): User
  }
  extend type Mutation {
    registerUser(name: String!, email: String!, password: String!, image: String): User 
    loginUser(email: String!, password: String!): User
    addUserMovie(user: String!, _id: ID!, title: String!, overview: String!, poster_path: String!, year: String, tags: [String]): User
    addUserShow(user: String!, _id: ID!, title: String!, overview: String!, poster_path: String!, year: String, tags: [String]): User
  }
  type User {
    _id: ID
    name: String
    email: String
    image: String
    access_token: String
    createdAt: String
    updatedAt: String
    isAdmin: Boolean
    movies: [UserMovie]
    Shows: [UserShow]
  }
  type UserMovie {
    user: String
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: [Rate]
    tags: [String]
    year: String
    createdAt: String
    updatedAt: String
  }
  type UserShow {
    user: String
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: [Rate]
    tags: [String]
    year: String
    createdAt: String
    updatedAt: String
  }
  type Rate {
    user: String
    score: Int
  }
`

const resolvers = {
  Query: {
    user: async (parent, args) => {
      const { data } = await axios.get(`http://35.223.53.125:3000/${args._id}`)
      return data
    },
  },
  Mutation: {
    registerUser: async(parent, args) => {
      const { data } = await axios.post('http://35.223.53.125:3000/register', { ...args })
      return data
    },
    loginUser: async(parent, args) => {
      const { data } = await axios.post('http://35.223.53.125:3000/login', { ...args })
      return data
    },
    addUserMovie: async(parent, args) => {
      // _id
      // title
      // overview
      // poster_path
      // year
      const { data } = await axios.patch(`http://35.223.53.125:3000/${args.user}/movie`, { ...args })
      return data
    },
    addUserShow: async(parent, args) => {
      // _id
      // title
      // overview
      // poster_path
      // year
      const { data } = await axios.patch(`http://35.223.53.125:3000/${args.user}/show`, { ...args })
      return data
    }
  }
}

module.exports = {
  typeDefs, resolvers
}