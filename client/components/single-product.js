import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/products'
import {createCartItem} from '../store/cart'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.productId)
  }

  async handleClick() {
    await this.setState({
      productId: this.props.selectedProduct.id,
      name: this.props.selectedProduct.name,
      quantity: 1,
      price: this.props.selectedProduct.price
    })
    const totalData = JSON.parse(localStorage.getItem('total'))
    totalData.total += this.props.selectedProduct.price
    localStorage.setItem('total', JSON.stringify(totalData))
    this.props.addToCart({...this.state})
  }

  render() {
    console.log('single product props', this.props.cart)
    const {
      price,
      name,
      imageUrl,
      inStock,
      description
    } = this.props.selectedProduct

    //LOCALSTORAGE
    if (typeof Storage !== 'undefined') {
      if (JSON.parse(localStorage.getItem('total')) === null) {
        // console.log("NO ITEMS ON LOCALSTORAGE", this.props.cart)
        localStorage.setItem('total', JSON.stringify({total: 0}))
      }
      if (JSON.parse(localStorage.getItem('items')) === null) {
        // console.log("NO ITEMS ON LOCALSTORAGE", this.props.cart)
        localStorage.setItem('items', JSON.stringify(this.props.cart))
        // window.location.reload();
        console.log('CART HERE ->', this.props.cart)
      } else {
        localStorage.setItem('items', JSON.stringify(this.props.cart))
        // window.location.reload();
        console.log('CART HERE ----->', this.props.cart)
      }
    }

    return (
      <div>
        <div id="product-image">
          <img src={imageUrl} />
        </div>
        <div id="product-details">
          <h2>{name}</h2>
          <h4>Price: ${price / 100}</h4>
          {inStock ? <h4>In Stock</h4> : <h4>Out of Stock</h4>}
        </div>
        <div id="product-description">
          <h4>Description: {description}</h4>
        </div>
        <div id="size-dropdown-list">
          <select>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              this.handleClick()
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    selectedProduct: state.products.selectedProduct,
    cart: state.cart.cartItems,
    total: state.cart.total
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadSingleProduct: productId => {
      dispatch(fetchSingleProduct(productId))
    },
    addToCart: cartObject => {
      dispatch(createCartItem(cartObject))
    }
    // addToCart: (productId, name, quantity, price) => {
    //   const cartObject = {
    //     productId,
    //     name,
    //     quantity,
    //     price
    //   }
    //   console.log('Cart Object -->', cartObject)
    //   dispatch(createCartItem(cartObject))
    // }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
