import React, {Component} from 'react'
import {createOrderDatabase} from '../store/orders'
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
      const order = {
        // userId: this.state.user.id,
        name: this.state.name,
        email: this.state.email,
        shippingAddress: this.state.shippingAddress,
        cartItems: this.props.cart,
        orderTotal: this.props.total
      }
      await this.props.createOrder(order)
      history.push('/checkoutDetails')
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    // console.log('checkout form props', this.props)
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
    isLoggedIn: !!state.user.id,
    cart: state.cart.cartItems,
    total: state.cart.total,
    order: state.orders.order
  }
}

const mapDispatch = dispatch => {
  return {
    createOrder: order => {
      dispatch(createOrderDatabase(order))
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
