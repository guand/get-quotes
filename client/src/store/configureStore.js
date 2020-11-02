import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import quotesReducer from '../reducers/quotes'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  const store = createStore(
    combineReducers({
      quotes: quotesReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  )
  console.log(store)
  return store
}