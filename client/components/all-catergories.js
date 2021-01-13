import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

export class AllCategories extends React.Component {
  render() {
    return (
      <div>
        <h1>Categories</h1>
        <div>
          <Link to="/sweaters">
            <h3>Sweaters</h3>
            <img
              src="https://cdn.shopify.com/s/files/1/2078/4327/products/combed-cotton-cable-knit-dog-sweater-jet-black_638_800x.jpg?v=1574878420"
              alt="picture of a sweater"
            />
          </Link>
        </div>
        <div>
          <Link to="dresses">
            <h3>Dresses</h3>
            <img
              src="https://cdn.shopify.com/s/files/1/2078/4327/products/polka-dot-dog-dress-black-and-white-697_800x.jpg?v=1606497591"
              alt="picture of a dress"
            />
          </Link>
        </div>
      </div>
    )
  }
}

// const mapState = (state) => {
//   return state
// }

// const mapDispatch = (dispatch) => ({

// })

// export default connect(mapState, mapDispatch)(AllCategories)

export default AllCategories
