import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateAddressInfo, updatePhoneInfo} from '../store/user'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor() {
    super()
    this.handleSubmitAddress = this.handleSubmitAddress.bind(this)
    this.handleSubmitPhone = this.handleSubmitPhone.bind(this)
    this.phonenumberVal = this.phonenumberVal.bind(this)
    this.addressValidator = this.addressValidator.bind(this)
  }

  handleSubmitAddress(evt) {
    evt.preventDefault()
    this.addressValidator(evt)
    this.props.updateAddressInfo(this.props.id, evt.target.address.value)
  }

  addressValidator(evt) {
    const formAddress = evt.target.phone.value
    var allowedLetters = /^[0-9a-zA-Z]+$/
    if (formAddress.value.match(allowedLetters)) {
      return true
    } else {
      alert('User address must have alphanumeric characters only')
      return false
    }
  }

  phonenumberVal(evt) {
    const formNumber = evt.target.phone.value
    console.log('formNumber', formNumber)
    alert('hello')

    const phoneTemplate = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (formNumber.value.match(phoneTemplate)) {
      return true
    } else {
      alert('Please enter valid phone number like')
      return false
    }
  }

  handleSubmitPhone(evt) {
    evt.preventDefault()
    console.log('event', evt)
    this.phonenumberVal(evt)
    this.props.updatePhoneInfo(this.props.id, evt.target.phone.value)
  }
  render() {
    const {id, name, email, address, phone} = this.props
    return (
      <div>
        <h3>Welcome, {name}</h3>
        <h4>My Info</h4>
        <h5>Email: {email}</h5>

        <div>
          <h5>Address: {address}</h5>
          <form onSubmit={this.handleSubmitAddress}>
            <label htmlFor="email">
              <small>New Address</small>
            </label>
            <input name="address" type="text" />
            <button type="submit">Edit</button>
          </form>
        </div>

        <div>
          <h5>
            Phone: ({phone.slice(0, 3)})-{phone.slice(3, 6)}-
            {phone.slice(6, 10)}
          </h5>
          <form onSubmit={this.handleSubmitPhone}>
            <label htmlFor="email">
              <small>New Phone Number</small>
            </label>
            <input name="phone" type="text" />
            <button type="submit">Edit</button>
          </form>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    id: state.user.id,
    name: state.user.name,
    email: state.user.email,
    address: state.user.address,
    phone: state.user.phone
  }
}

const mapDispatch = dispatch => {
  return {
    updateAddressInfo(userId, address) {
      dispatch(updateAddressInfo(userId, address))
    },
    updatePhoneInfo(userId, phone) {
      dispatch(updatePhoneInfo(userId, phone))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
