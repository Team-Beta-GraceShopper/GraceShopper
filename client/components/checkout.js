import React, {Component} from 'react'
import {createOrderDatabase, clearOrder} from '../store/orders'
import {connect} from 'react-redux'

class Checkout extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.createOrder} />
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
    },
    clearOrder: () => {
      dispatch(clearOrder())
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
