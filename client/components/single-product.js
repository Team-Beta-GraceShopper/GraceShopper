import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/products'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.productId)
  }

  render() {
    console.log('single product props', this.props)
    return (
      <div>
        <h1>Hello world</h1>
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
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
