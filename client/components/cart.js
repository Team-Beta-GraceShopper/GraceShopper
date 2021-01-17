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

  // pull local state data
  // use local state data for rendering
  // add quantity buttons to local state

  handleAddQuantity(name) {
    // this.props.addQuantity(id)
    const items = JSON.parse(localStorage.getItem('items'))
    const totalPrice = JSON.parse(localStorage.getItem('total'))
    let item = items.find(item => item.name === name)
    if (item) {
      item.quantity += 1
      totalPrice.total += item.price
    }
    console.log(items)
    localStorage.setItem('items', JSON.stringify(items))
    localStorage.setItem('total', JSON.stringify(totalPrice))
    window.location.reload()
  }

  handleSubtractQuantity(name) {
    // this.props.subtractQuantity(id)
    const items = JSON.parse(localStorage.getItem('items'))
    const totalPrice = JSON.parse(localStorage.getItem('total'))
    let item = items.find(item => item.name === name)
    if (item.quantity > 1) {
      item.quantity -= 1
      totalPrice.total -= item.price
    }
    localStorage.setItem('items', JSON.stringify(items))
    localStorage.setItem('total', JSON.stringify(totalPrice))
    window.location.reload()
  }

  render() {
    // if(typeof Storage !== "undefined"){
    //   if (JSON.parse(localStorage.getItem("total")) === null){
    //     console.log("NO ITEMS ON LOCALSTORAGE", this.props.cart)
    //     localStorage.setItem("total", JSON.stringify({total: 0}))
    //   }
    // }

    console.log('HERE --->', JSON.parse(localStorage.getItem('items')))
    console.log('CART HERE --->', this.props.cart)
    const localStorageData = JSON.parse(localStorage.getItem('items'))
    const localStorageTotal = JSON.parse(localStorage.getItem('total'))
    console.log(localStorageTotal.total)
    const {cart, total} = this.props
    console.log('cart props:', this.props)

    return (
      <div>
        <div>hello world</div>

        <h2>My Cart</h2>
        {localStorageData !== null ? (
          <div>
            {localStorageData.map(item => (
              <div key={item.id}>
                <h2>{item.name}</h2>
                <p>Price: ${item.price / 100}</p>
                <p>Quantity: {item.quantity}</p>
                <div id="quantity">
                  <h4>quantity</h4>
                  <button
                    type="button"
                    onClick={() => {
                      this.handleSubtractQuantity(item.name)
                    }}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.handleAddQuantity(item.name)
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <h1>Total: ${localStorageTotal.total / 100}</h1>
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
