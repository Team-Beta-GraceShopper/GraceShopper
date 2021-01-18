/* eslint-disable no-case-declarations */
import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const CREATE_ORDER = 'GET_ORDER_DETAILS'
const CLEAR_ORDER = 'CLEAR_ORDER'
const CLEAR_CART = 'CLEAR_CART'

/**
 * ACTION CREATORS
 */

export const createOrder = order => ({
  type: CREATE_ORDER,
  order
})

export const clearOrder = () => ({
  type: CLEAR_ORDER
})
/**
 * THUNK CREATORS
 */

export const createOrderDatabase = order => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/orders', order)
      dispatch(createOrder(res.data))
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
      return {
        ...state,
        order: null
      }

    default:
      return state
  }
}
