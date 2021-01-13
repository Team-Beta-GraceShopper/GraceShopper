import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_TO_CART = 'ADD_TO_CART'
/**
 * ACTION CREATORS
 */
const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

const addToCart = (product = {
  type: ADD_TO_CART,
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

/**
 * INITIAL STATE
 */
const initialState = {
  allProducts: [],
  cartItems: [],
  total: 0
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, allProducts: action.products}
    case ADD_TO_CART:
      return {...state, cartItems: [...state.cartItems, action.product]}

    default:
      return state
  }
}
