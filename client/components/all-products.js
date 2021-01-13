import React from 'react'
import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'
import SingleProduct from './single-product'

const AllProducts = props => {
  console.log('all category props', props)
  const products = props.products

  return (
    <div>
      <div>
        {products.map(product => {
          return (
            <div key={product.id}>
              <Link to="route" component={SingleProduct}>
                <h1>{product.name}</h1>
              </Link>
              <img src={product.imageUrl} />
              <h3>${product.price / 100}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllProducts
