import React, {Component} from 'react'
import {connect} from 'react-redux'
import {clearOrder, createOrderDetailsDatabase} from '../store/orders'

class CheckoutDetails extends Component {
  render() {
    console.log('checkout details props------>', this.props)
    const cartItems = this.props.cart
    const order = this.props.order
    const {id, name, email, shippingAddress, orderTotal} = this.props.order
    return (
      <div>
        {!order.id ? (
          <h3>Nothing to checkout</h3>
        ) : (
          <div>
            <h3>Your order has been placed</h3>
            <h2>Order</h2>
            <ul>
              <li>
                <div>Name:</div>
                <div>{name}</div>
              </li>
              <li>
                <div>Email:</div>
                <div>{email}</div>
              </li>
              <li>
                <div>Address:</div>
                <div>{shippingAddress}</div>
              </li>
              <li>
                <div>Cart Items:</div>
                <div>
                  {cartItems.map(item => {
                    return (
                      <div key={item.id}>
                        {`${item.quantity} x ${item.name}`}
                        {this.props.createOrderDetails(id, item)}
                      </div>
                    )
                  })}
                </div>
              </li>
              <li>
                <div>Total</div>
                <div>${orderTotal / 100}</div>
              </li>
            </ul>
            {/* {this.props.clearOrder()}  */}
            {/* {localStorage.clear("cartItems")}
             {localStorage.clear("total")} */}
          </div>
        )}
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
    createOrderDetails: (id, item) => {
      dispatch(createOrderDetailsDatabase(id, item))
    },
    clearOrder: () => {
      dispatch(clearOrder())
    }
  }
}

export default connect(mapState, mapDispatch)(CheckoutDetails)
