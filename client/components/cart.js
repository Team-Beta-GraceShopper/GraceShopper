import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  render() {
    return (
      <div>
        <h1> Hello</h1>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.products.cartItems,
    total: state.products.total
  }
}
// mapDispatch = (dispatch) => {
//   loadCart: () => dispatch()
// }

export default connect(mapState)(Cart)
