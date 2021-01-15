import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/products'
import {createCartItem} from '../store/cart'

class SingleProduct extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.productId)
  }

  handleClick(id, name, quantity, price) {
    this.props.addToCart(
      this.props.selectedProduct.id,
      this.props.selectedProduct.name,
      1,
      this.props.selectedProduct.price
    )
  }

  render() {
    console.log('single product props', this.props)
    const {id, price} = this.props.selectedProduct
    const quantity = 1
    return (
      <div>
        <div id="product-image">
          <img src={this.props.selectedProduct.imageUrl} />
        </div>
        <div id="product-details">
          <h2>{this.props.selectedProduct.name}</h2>
          <h4>Price: ${this.props.selectedProduct.price / 100}</h4>
          {this.props.selectedProduct.inStock ? (
            <h4>In Stock</h4>
          ) : (
            <h4>Out of Stock</h4>
          )}
        </div>
        <div id="product-description">
          <h4>Description: {this.props.selectedProduct.description}</h4>
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
              this.handleClick(id, name, quantity, price)
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
    addToCart: (productId, name, quantity, price) => {
      const cartObject = {
        productId,
        name,
        quantity,
        price
      }
      console.log('Cart Object -->', cartObject)
      dispatch(createCartItem(cartObject))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
