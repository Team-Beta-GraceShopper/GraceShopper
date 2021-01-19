import React, {Component} from 'react'
import {connect} from 'react-redux'
import {clearOrder} from '../store/orders'
import {clearCart} from '../store/cart'

class CheckoutDetails extends Component {
  componentDidMount() {
    this.props.clearOrder()
    this.props.clearCart()
    localStorage.clear('cartItems')
    localStorage.clear('total')
  }
  render() {
    console.log('checkout details props------>', this.props)
    return (
      <div>
        <h3>Your order has been placed!</h3>
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
    clearOrder: () => {
      dispatch(clearOrder())
    },
    clearCart: () => {
      dispatch(clearCart())
    }
  }
}

export default connect(mapState, mapDispatch)(CheckoutDetails)
