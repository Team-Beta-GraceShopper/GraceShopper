import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addQuantity, subtractQuantity} from '../store/cart'

class Cart extends Component {
  constructor(props) {
    super(props)
    // this.handleClick = this.handleClick.bind(this)
    // this.calculateTotal = this.calculateTotal.bind(this)
    this.handleAddQuantity = this.handleAddQuantity.bind(this)
    this.handleSubtractQuantity = this.handleSubtractQuantity.bind(this)
  }

  // calculateTotal () {

  // }

  handleAddQuantity(id) {
    this.props.addQuantity(id)
  }

  handleSubtractQuantity(id) {
    this.props.subtractQuantity(id)
  }

  render() {
    const {cart, total} = this.props
    console.log('cart props:', this.props)
    return (
      <div>
        <div>hello world</div>

        <h2>My Cart</h2>
        {cart.length ? (
          <div>
            {cart.map(item => (
              <div key={item.id}>
                <h2>{item.name}</h2>
                <p>Price: ${item.price / 100}</p>
                <p>Quantity: {item.quantity}</p>
                <div id="quantity">
                  <h4>quantity</h4>
                  <button
                    type="button"
                    onClick={() => {
                      this.handleSubtractQuantity(item.id)
                    }}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.handleAddQuantity(item.id)
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <h1>Total: ${this.props.total / 100}</h1>
            <button type="button" onClick={() => {}}>
              Checkout
            </button>
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

const mapDispatch = dispatch => {
  return {
    addQuantity: id => {
      dispatch(addQuantity(id))
    },
    subtractQuantity: id => {
      dispatch(subtractQuantity(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
