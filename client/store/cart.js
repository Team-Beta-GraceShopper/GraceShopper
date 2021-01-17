/* eslint-disable no-case-declarations */
import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const ADD_TO_CART = 'ADD_TO_CART'
const ADD_QUANTITY = 'ADD_QUANTITY'
const SUBTRACT_QUANTITY = 'SUBTRACT_QUANTITY'
const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS'
/**
 * ACTION CREATORS
 */

export const addToCart = cartItem => ({
  type: ADD_TO_CART,
  cartItem
})

export const addQuantity = itemId => ({
  type: ADD_QUANTITY,
  itemId
})

export const subtractQuantity = itemId => ({
  type: SUBTRACT_QUANTITY,
  itemId
})

export const getOrderDetails = orderDetails => ({
  type: GET_ORDER_DETAILS,
  orderDetails
})

/**
 * THUNK CREATORS
 */

export const createCartItem = cartObject => {
  return async dispatch => {
    try {
      // Comparing cartObject with orderDetails database

      // if (cartObject)
      const res = await axios.post('/api/orderDetails', cartObject)
      dispatch(addToCart(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}
// id needs to be orderDetails id and not product id:
export const addQuantityToDatabase = (itemId, quantity) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/orderDetails/${itemId}`, quantity)
      dispatch(addQuantity(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchOrderDetails = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/orderDetails')
      dispatch(getOrderDetails(res.data))
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
      //check if the action id already exists in the cartItems
      let existedItem = state.cartItems.find(
        item => item.name === action.cartItem.name
      )
      if (existedItem) {
        // action.cartItem.quantity += 1 //Question of what is this doing?
        existedItem.quantity += 1 //Fixed duplicate items on cart page if addToCart button is pressed more than once
        return {
          ...state,
          total: state.total + action.cartItem.price
        }
      } else {
        action.cartItem.quantity = 1
        //calculating the total
        let newTotal = state.total + action.cartItem.price
        return {
          ...state,
          cartItems: [...state.cartItems, action.cartItem],
          total: newTotal
        }
      }

    case ADD_QUANTITY:
      let addedItem = state.cartItems.find(item => item.id === action.itemId)
      addedItem.quantity += 1
      let newTotal = state.total + addedItem.price
      return {
        ...state,
        total: newTotal
      }

    case SUBTRACT_QUANTITY:
      let subtractedItem = state.cartItems.find(
        item => item.id === action.itemId
      )
      if (subtractedItem.quantity === 1) {
        let newItems = state.cartItems.filter(item => item.id !== action.itemId)
        let reducedTotal = state.total - subtractedItem.price
        return {
          ...state,
          cartItems: newItems,
          total: reducedTotal
        }
      } else {
        subtractedItem.quantity -= 1
        let reducedTotal = state.total - subtractedItem.price
        return {
          ...state,
          total: reducedTotal
        }
      }

    default:
      return state
  }
}
