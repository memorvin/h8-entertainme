const axios = require('axios'),
      { gql, ApolloError } = require('apollo-server'),
      redis = require('../redis')

const typeDefs = gql`
  extend type Query {
    movies: [Movie]
    movie(_id: ID): Movie
  }
  extend type Mutation {
    addMovie(title: String, overview: String, poster_path: String, year: String, tags: [String]): Movie
    editMovie(_id: ID, title: String, overview: String, poster_path: String, year: String, tags: [String]): Movie
    rateMovie(_id: ID, user: String, score: Int): Movie
    deleteMovie(_id: ID): Movie
  }
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: [MovieRating]
    tags: [String]
    year: String
    createdAt: String
    updatedAt: String
  }
  type MovieRating {
    user: String
    score: Int
  }
`

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const totalMovies = await redis.scard('totalMovies')
        if (totalMovies > 0) {
          const movies = await redis.hvals('movies')
          return movies.map(JSON.parse)
        }
        const { data } = await axios.get(`http://35.223.53.125:3001`)
        movies = data.reduce((acc, movie) => {
          acc.push(movie._id, JSON.stringify(movie))
          return acc
        }, [])
        redis.hset('movies', ...movies)
        redis.expire('movies', 3600)
        redis.sadd('totalMovies', ...data.map(t => t._id))
        redis.expire('totalMovies', 3600)
        return data
      } catch(err) {
        throw new ApolloError(err)
      }
    },
    movie: async (parent, args) => {
      try {
        let movie = await redis.hget('movies', args._id)
        if (movie) {
          return JSON.parse(movie)
        }
        const { data } =  await axios.get(`http://35.223.53.125:3001/${args._id}`)
        redis.hset('movies', args._id, JSON.stringify(data))
        redis.expire('movies', 3600)
        return data
      } catch(err) {
        throw new ApolloError(err)
      }
    },
  },
  Mutation: {
    addMovie: async (parent, args) => {
      try {
        const { data } =  await axios.post('http://35.223.53.125:3001/', { ...args })
        redis.hset('movies', data._id, JSON.stringify(data))
        redis.expire('movies', 3600)
        const totalMovies = await redis.scard('totalMovies')
        if (totalMovies > 0) {
          redis.sadd('totalMovies', data._id)
          redis.expire('totalMovies', 3600)
        }
        return data
      } catch (err) {
        throw new ApolloError(err)
      }
    },
    editMovie: async (parent, args) => {
      try {
        const { data } = await axios.put(`http://35.223.53.125:3001/${args._id}`, { ...args })
        redis.hset('movies', data._id, JSON.stringify(data))
        redis.expire('movies', 3600)
        redis.sadd('totalMovies', data._id)
        redis.expire('totalMovies', 3600)
        return data
      } catch (err) {
        throw new ApolloError(err)
      }
    },
    rateMovie: async (parent, args) => {
      // args.user
      // args.score
      try {
        const { data } = await axios.patch(`http://35.223.53.125:3001/${args._id}`,
        { user:args.user, score: args.score })
        redis.hset('movies', data._id, JSON.stringify(data))
        redis.expire('movies', 3600)
        redis.sadd('totalMovies', data._id)
        redis.expire('totalMovies', 3600)
        return data
      } catch (err) {
        throw new ApolloError(err)
      }
    },
    deleteMovie: async (parent, args) => {
      try {
        const { data } = await axios.delete(`http://35.223.53.125:3001/${args._id}`)
        redis.hdel('movies', args._id)
        redis.spop('totalMovies', args._id)
        return {
          data,
          message: `Movie ${args._id} deleted`
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