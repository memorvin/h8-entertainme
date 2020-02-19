const axios = require('axios'),
      { gql, ApolloError } = require('apollo-server'),
      redis = require('../redis')

const typeDefs = gql`
  extend type Query {
    shows: [Show]
    show(_id: ID): Show
  }
  extend type Mutation {
    addShow (title: String, overview: String, poster_path: String, year: String, tags: [String]): Show
    editShow(_id: ID, title: String, overview: String, year: String, poster_path: String, tags: [String]): Show
    rateShow(_id: ID, user: String, score: Int): Show
    deleteShow(_id: ID): Show
  }
  type Show {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: [ShowRating]
    tags: [String]
    year: String
    createdAt: String
    updatedAt: String
  }
  type ShowRating {
    user: String
    score: Int
  }
`

const resolvers = {
  Query: {
    shows: async () => {
      try {
        const totalShows = await redis.scard('totalShows')
        if (totalShows > 0) {
          const shows = await redis.hvals('shows')
          return shows.map(JSON.parse)
        }
        const { data } = await axios.get(`http://35.223.53.125:3002`)
        shows = data.reduce((acc, show) => {
          acc.push(show._id, JSON.stringify(show))
          return acc
        }, [])
        redis.hset('shows', ...shows)
        redis.expire('shows', 3600)
        redis.sadd('totalShows', ...data.map(t => t._id))
        redis.expire('totalShows', 3600)
        return data
      } catch(err) {
        throw new ApolloError(err)
      }
    },
    show: async (parent, args) => {
      try {
        let show = await redis.hget('shows', args._id)
        if (show) {
          return JSON.parse(show)
        }
        const { data } =  await axios.get(`http://35.223.53.125:3002/${args._id}`)
        redis.hset('shows', args._id, JSON.stringify(data))
        redis.expire('shows', 3600)
        return data
      } catch(err) {
        throw new ApolloError(err)
      }
    },
  },
  Mutation: {
    addShow: async (parent, args) => {
      try {
        const { data } =  await axios.post('http://35.223.53.125:3002/', { ...args })
        redis.hset('shows', data._id, JSON.stringify(data))
        redis.expire('shows', 3600)
        const totalShows = await redis.scard('totalShows')
        if (totalShows > 0) {
          redis.sadd('totalShows', data._id)
          redis.expire('totalShows', 3600)
        }
        return data
      } catch (err) {
        throw new ApolloError(err)
      }
    },
    editShow: async (parent, args) => {
      try {
        const { data } = await axios.put(`http://35.223.53.125:3002/${args._id}`, { ...args })
        redis.hset('shows', data._id, JSON.stringify(data))
        redis.expire('shows', 3600)
        redis.sadd('totalShows', data._id)
        redis.expire('totalShows', 3600)
        return data
      } catch (err) {
        throw new ApolloError(err)
      }
    },
    rateShow: async (parent, args) => {
      // args.user
      // args.rating
      try {
        const { data } = await axios.patch(`http://35.223.53.125:3002/${args._id}`,
        { user:args.user, score: args.score })
        redis.hset('shows', data._id, JSON.stringify(data))
        redis.expire('shows', 3600)
        redis.sadd('totalShows', data._id)
        redis.expire('totalShows', 3600)
        return data
      } catch (err) {
        throw new ApolloError(err)
      }
    },
    deleteShow: async (parent, args) => {
      try {
        const { data } = await axios.delete(`http://35.223.53.125:3002/${args._id}`)
        redis.hdel('shows', args._id)
        redis.spop('totalShows', args._id)
        return {
          data,
          message: `Show ${args._id} deleted`
        }
      } catch (err) {
        throw new ApolloError(err)
      }
    }
  },
}

module.exports = {
  typeDefs, resolvers
}