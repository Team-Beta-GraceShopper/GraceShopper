/* eslint-disable no-case-declarations */
import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const CREATE_ORDER_DETAILS = 'CREATE_ORDER_DETAILS'
const CREATE_ORDER = 'CREATE_ORDER'
const CLEAR_ORDER = 'CLEAR_ORDER'
const CLEAR_CART = 'CLEAR_CART'

/**
 * ACTION CREATORS
 */

export const createOrderDetails = orderDetails => ({
  type: CREATE_ORDER_DETAILS,
  orderDetails
})

export const createOrder = order => ({
  type: CREATE_ORDER,
  order
})

export const clearOrder = () => ({
  type: CLEAR_ORDER
})

export const clearCart = () => ({
  type: CLEAR_CART
})
/**
 * THUNK CREATORS
 */
export const createOrderDatabase = order => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/orders', order)
      console.log('sending to database')
      dispatch(createOrder(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const createOrderDetailsDatabase = (orderId, item) => {
  return async dispatch => {
    try {
      const orderDetails = {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        orderId: orderId,
        productId: item.id
      }
      const res = await axios.post('/api/orderDetails', orderDetails)
      dispatch(createOrderDetails(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  order: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        order: action.order
      }
    case CLEAR_ORDER:
      localStorage.clear('cartItems')
      localStorage.clear('total')
      return {
        ...state,
        order: null
      }

    default:
      return state
  }
}
