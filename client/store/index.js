import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducers'
import { thunk } from './middlewares'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

console.log(store.getState())

export default store;