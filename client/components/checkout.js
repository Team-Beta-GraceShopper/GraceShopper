import React, {Component} from 'react'
import {createOrderDatabase, clearOrder} from '../store/orders'
import {me} from '../store/user'
import {connect} from 'react-redux'
import history from '../history'

const defaultState = {
  name: '',
  email: '',
  shippingAddress: ''
}

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleInput = this.handleInput.bind(this)
    this.createOrder = this.createOrder.bind(this)
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async createOrder(e) {
    e.preventDefault()

    try {
      let specificUser
      if (this.props.user) {
        specificUser = this.props.user
      } else {
        specificUser = 1
      }
      const order = {
        userId: specificUser,
        name: this.state.name,
        email: this.state.email,
        shippingAddress: this.state.shippingAddress,
        cartItems: this.props.cart,
        orderTotal: this.props.total
      }
      const cartCopy = this.props.cart.slice()
      await this.props.createOrder(order, cartCopy)
      history.push('/checkoutDetails')
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div>
        <h2>Checkout Information</h2>
        <form onSubmit={this.createOrder}>
          <ul>
            <li>
              <label>Name</label>
              <input
                name="name"
                type="text"
                required
                onChange={this.handleInput}
              />
            </li>

            <li>
              <label>Email</label>
              <input
                name="email"
                type="email"
                required
                onChange={this.handleInput}
              />
            </li>

            <li>
              <label>Address</label>
              <input
                name="shippingAddress"
                type="text"
                required
                onChange={this.handleInput}
              />
            </li>

            <li>
              <button type="submit">Checkout</button>
            </li>
          </ul>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user.id,
    cart: state.cart.cartItems,
    total: state.cart.total,
    order: state.orders.order,
    orderDetails: state.orders.orderDetails
  }
}

const mapDispatch = dispatch => {
  return {
    createOrder: (order, cart) => {
      dispatch(createOrderDatabase(order, cart))
    },
    clearOrder: () => {
      dispatch(clearOrder())
    },
    me: () => {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
