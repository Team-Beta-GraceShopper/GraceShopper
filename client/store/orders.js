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
const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS'

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

export const getOrderDetails = orderDetails => ({
  type: GET_ORDER_DETAILS,
  orderDetails
})
/**
 * THUNK CREATORS
 */
export const fetchOrderDetails = orderId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/orderDetails/order/${orderId}`)
      dispatch(getOrderDetails(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const createOrderDetailsDatabase = (orderId, orderDetails) => {
  return async dispatch => {
    try {
      await axios.post('/api/orderDetails', orderDetails)
      dispatch(createOrderDetails(orderDetails))
    } catch (error) {
      console.error(error)
    }
  }
}

export const createOrderDatabase = (order, cart) => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/orders', order)
      dispatch(createOrder(res.data))

      const orderId = res.data.id
      cart.map(item => {
        const orderDetails = {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          orderId: orderId,
          productId: item.id
        }
        dispatch(createOrderDetailsDatabase(orderId, orderDetails))
      })
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
      return initialState

    default:
      return state
  }
}
