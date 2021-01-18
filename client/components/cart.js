import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addQuantity, subtractQuantity, removeFromCart} from '../store/cart'
import {createOrderDatabase, clearOrder} from '../store/orders'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleAddQuantity = this.handleAddQuantity.bind(this)
    this.handleSubtractQuantity = this.handleSubtractQuantity.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  async handleAddQuantity(id) {
    await this.props.addQuantity(id)
    localStorage.setItem('cartItems', JSON.stringify(this.props.cart))
    localStorage.setItem('total', JSON.stringify(this.props.total))
  }

  async handleSubtractQuantity(id) {
    await this.props.subtractQuantity(id)
    localStorage.setItem('cartItems', JSON.stringify(this.props.cart))
    localStorage.setItem('total', JSON.stringify(this.props.total))
  }

  async removeItem(product) {
    await this.props.removeFromCart(product)
    localStorage.setItem('cartItems', JSON.stringify(this.props.cart))
    localStorage.setItem('total', JSON.stringify(this.props.total))
  }

  async handleCheckout() {
    await this.props.createOrder()
    localStorage.clear('cartItems')
    localStorage.clear('total')
  }

  render() {
    const {cart, total} = this.props
    console.log('cart props:', this.props)
    return (
      <div>
        <h2>My Cart</h2>
        {cart.length ? (
          <div>
            {cart.map(item => (
              <div key={item.id}>
                <h2>{item.name}</h2>
                <p>Price: ${item.price / 100}</p>
                <p>Quantity: {item.quantity}</p>
                <div id="quantity">
                  <h4>update quantity:</h4>
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
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      this.removeItem(item)
                    }}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
            <h2>Total: ${total / 100}</h2>
            <button
              type="button"
              onClick={() => {
                this.handleCheckout()
              }}
            >
              Checkout
            </button>
          </div>
        ) : (
          <h3>Nothing is in the cart!</h3>
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
    addQuantity: id => {
      dispatch(addQuantity(id))
    },
    subtractQuantity: id => {
      dispatch(subtractQuantity(id))
    },
    removeFromCart: product => {
      dispatch(removeFromCart(product))
    },
    createOrder: () => {
      dispatch(createOrderDatabase())
    },
    clearOrder: () => {
      dispatch(clearOrder())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
