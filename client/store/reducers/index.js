import { combineReducers } from 'redux'
import users from './users'
import shows from './shows'
import movies from './movies'

export const rootReducer = combineReducers({
  users,
  movies,
  shows
})