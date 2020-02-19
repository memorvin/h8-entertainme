import { gql } from 'apollo-boost'

export const DEL_MOVIE = gql`
  mutation($id: ID) {
    deleteMovie(_id: $id) {
      title
    }
  }
`

export const DEL_SHOW = gql`
  mutation($id: ID) {
    deleteShow(_id: $id) {
      title
    }
  }
`

export const GET_MOVIES = gql`
  query {
    movies {
      _id
      title
      overview
      poster_path
      year
      popularity {
        user
        score
      }
      tags
    }
  }
`

export const GET_SHOWS = gql`
  query {
    shows {
      _id
      title
      overview
      poster_path
      year
      popularity {
        user
        score
      }
      tags
    }
  }
`

export const GET_MOVIE = gql`
  query ($id: ID) {
    movie(_id: $id) {
      _id
      title
      overview
      poster_path
      year
      popularity {
        user
        score
      }
      tags
    }
  }
`

export const GET_SHOW = gql`
  query ($id: ID) {
    show(_id: $id) {
      _id
      title
      overview
      poster_path
      year
      popularity {
        user
        score
      }
      tags
    }
  }
`

export const ADD_MOVIE = gql`
  mutation ($title: String, $overview: String, $poster_path: String, $year: String, $tags: [String]) {
    addMovie(title: $title, overview: $overview, poster_path: $poster_path, year: $year, tags:$tags) {
      _id
      title
      overview
      poster_path
      year
      popularity {
        user
        score
      }
      tags
    }
  }
`

export const ADD_SHOW = gql`
  mutation ($title: String, $overview: String, $poster_path: String, $year: String, $tags: [String]) {
    addShow(title: $title, overview: $overview, poster_path: $poster_path, year: $year, tags:$tags) {
      _id
      title
      overview
      poster_path
      year
      popularity {
        user
        score
      }
      tags
    }
  }
`

export const EDIT_MOVIE = gql`
  mutation ($id: ID, $title: String, $overview: String, $poster_path: String, $year: String, $tags: [String]) {
    editMovie(_id: $id, title: $title, overview: $overview, poster_path: $poster_path, year: $year, tags:$tags) {
      _id
      title
      overview
      poster_path
      year
      popularity {
        user
        score
      }
      tags
    }
  }
`

export const EDIT_SHOW = gql`
  mutation ($id: ID, $title: String, $overview: String, $poster_path: String, $year: String, $tags: [String]) {
    editShow(_id: $id, title: $title, overview: $overview, poster_path: $poster_path, year: $year, tags:$tags) {
      _id
      title
      overview
      poster_path
      year
      popularity {
        user
        score
      }
      tags
    }
  }
`

export const LOGIN_USER = gql`
  mutation ($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      _id
      name
      email
      isAdmin
    }
  }
`

export const REGISTER_USER = gql`
  mutation ($name: String, $email: String, $password: String) {
    registerUser(name: $name, email: $email, password: $password) {
      _id
      name
      email
      isAdmin
    }
  }
`

export const RATE_MOVIE = gql`
  mutation ($id: ID, $user: String, $score: Int) {
    rateMovie(_id: $id, user: $user, score: $score) {
      _id
      title
      overview
      poster_path
      popularity {
        user
        score
      }
      tags
      year
    }
  }
`

export const RATE_SHOW = gql`
  mutation ($id: ID, $user: String, $score: Int) {
    rateShow(_id: $id, user: $user, score: $score) {
      _id
      title
      overview
      poster_path
      popularity {
        user
        score
      }
      tags
      year
    }
  }
`