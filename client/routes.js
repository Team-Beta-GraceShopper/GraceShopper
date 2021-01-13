import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
// import all components:
import {Login, Signup, UserHome, AllProducts, Home} from './components'
import {me} from './store'
import {fetchProducts} from './store/products'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.loadProducts()
  }

  render() {
    const {isLoggedIn, products} = this.props
    console.log('route props', this.props)
    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route
            exact
            path="/"
            render={routeProps => <AllProducts products={products} />}
          />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route
            exact
            path="/{productId}"
            render={routeProps => <SingleProduct product={product} />}
          />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadProducts: () => {
      dispatch(fetchProducts())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
