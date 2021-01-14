import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
/**
 * ACTION CREATORS
 */
const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

const setSingleProduct = product => ({
  type: SET_SINGLE_PRODUCT,
  product
})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/products')
      dispatch(setProducts(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchSingleProduct = productId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/products/${productId}`)
      dispatch(setSingleProduct(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  allProducts: [],
  selectedProduct: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, allProducts: action.products}
    case SET_SINGLE_PRODUCT:
      return {...state, selectedProduct: action.product}
    default:
      return state
  }
}
