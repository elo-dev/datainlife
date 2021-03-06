import { createStore, combineReducers } from 'redux'
import { productsReducer } from './reducers/productsReducer'

const rootReducer = combineReducers({
  products: productsReducer
})

export const store = createStore(rootReducer)
