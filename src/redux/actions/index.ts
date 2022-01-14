import { SET_PRODUCTS } from "../constants";

export const setProductsAction = (product:any) => ({
  type: SET_PRODUCTS,
  payload: product
})