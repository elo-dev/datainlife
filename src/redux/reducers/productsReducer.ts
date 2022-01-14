import { SET_PRODUCTS } from '../constants'

const initialState = {
  products: [],
}

export const productsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload }
    default:
      return state
  }
}
