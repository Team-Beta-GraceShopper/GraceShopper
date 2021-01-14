import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, addToCart} from '../store/products'
// import cartReducer from './components/reducers/cartReducer';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';

class SingleProduct extends Component {
  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.productId)
  }

  handleClick = id => {
    this.props.addToCart(id)
  }

  render() {
    console.log('single product props', this.props)
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
          <form id="add-to-cart" onClick={this.handleClick}>
            {/* <input type="text" name="name" onChange={handleChange} value={name} /> */}
            <button
              onClick={() => {
                this.handleClick(this.props.selectedProduct.id)
              }}
            >
              Add to Cart
            </button>
          </form>
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
    addToCart: productId => {
      dispatch(addToCart(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
