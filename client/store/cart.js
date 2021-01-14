import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const ADD_TO_CART = 'ADD_TO_CART'
/**
 * ACTION CREATORS
 */

const addToCart = product => ({
  type: ADD_TO_CART,
  product
})

/**
 * THUNK CREATORS
 */

export const createCartItem = cartObject => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/orderDetails', cartObject)
      dispatch(addToCart(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  cartItems: [],
  total: 0
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, cartItems: [...state.cartItems, action.product]}
    default:
      return state
  }
}
