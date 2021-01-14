import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  render() {
    const {cart} = this.props
    // const cart = {
    //   productId: 1,

    // }

    console.log('this is the props:', this.props)
    return (
      <div>
        <div>hello world</div>

        <h1>Cart</h1>
        {cart.length ? (
          <div>
            cart.map((item) => (
            <div key={item.id}>
              <h2>Name: {item.name}</h2>
              <h2>Price: ${item.price / 100}</h2>
              <h2>Quantity: {item.quantity}</h2>
              <div id="quantity">
                <h4>quantity</h4>
                <button
                  type="button"
                  onClick={() => {
                    this.handleAddQuantity()
                  }}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.handleSubtractQuantity()
                  }}
                >
                  -
                </button>
              </div>
            </div>
            ))
            <h1>Total: ${this.props.total}</h1>
          </div>
        ) : (
          <h1>Nothing is in the cart!</h1>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart.cartItems,
    total: state.cart.total
  }
}
// mapDispatch = (dispatch) => {
//   loadCart: () => dispatch()
// }

export default connect(mapState)(Cart)
