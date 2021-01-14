import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, createCartItem} from '../store/products'

class SingleProduct extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.productId)
  }

  handleClick(id, quantity, price) {
    this.props.addToCart(
      this.props.selectedProduct.id,
      5,
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
          <h4>{this.props.selectedProduct.price}</h4>
          {this.props.selectedProduct.inStock ? (
            <h4>In Stock</h4>
          ) : (
            <h4>Out of Stock</h4>
          )}
        </div>
        <div id="product-description">
          <h4>{this.props.selectedProduct.description}</h4>
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
              this.handleClick(id, quantity, price)
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
    cart: state.products.cartItems,
    total: state.products.total
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
    addToCart: (productId, quantity, price) => {
      const cartObject = {
        productId,
        quantity,
        price
      }
      console.log('Cart Object -->', cartObject)
      dispatch(createCartItem(cartObject))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
