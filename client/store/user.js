import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const authLogin = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const authSignUp = (
  username,
  email,
  password,
  method
) => async dispatch => {
  let res
  try {
    console.log('AUTH1---->', username)
    console.log('AUTH2---->', email)
    console.log('AUTH3---->', password)
    console.log('AUTH4---->', method.value)
    res = await axios.post(`/auth/${method}`, {
      name: username,
      email: email,
      password: password,
      type: 'User',
      address: '',
      phone: ''
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const updateAddressInfo = (userId, address) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${userId}`, {address: address})
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const updatePhoneInfo = (userId, phone) => async dispatch => {
  try {
    console.log('REDUX1----->', userId)
    console.log('REDUX2----->', phone)
    const res = await axios.put(`/api/users/${userId}`, {phone: phone})
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
