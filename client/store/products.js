import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS'
/**
 * ACTION CREATORS
 */
const setProducts = products => ({
  type: SET_PRODUCTS,
  products
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
const initialState = []

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
