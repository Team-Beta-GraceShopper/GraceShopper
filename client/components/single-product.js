import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/products'
import {addToCart} from '../store/cart'

class SingleProduct extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.productId)
  }

  async handleClick(product) {
    await this.props.addToCart(product)
    localStorage.setItem('cartItems', JSON.stringify(this.props.cart))
    localStorage.setItem('total', JSON.stringify(this.props.total))
  }

  render() {
    // console.log('single product props', this.props)
    const product = this.props.selectedProduct
    const {
      price,
      name,
      imageUrl,
      inStock,
      description
    } = this.props.selectedProduct
    return (
      <div className="product">
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
              this.handleClick(product)
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
    addToCart: product => {
      dispatch(addToCart(product))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
