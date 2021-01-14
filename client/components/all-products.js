import React from 'react'
import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'

const AllProducts = props => {
  console.log('all product props', props)
  const products = props.products

  return (
    <div>
      <div id="container">
        {products.map(product => {
          return (
            <div key={product.id} className="">
              <Link to={`products/${product.id}`}>
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
