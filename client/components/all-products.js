import React from 'react'
import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'

const AllProducts = props => {
  const products = props.products

  return (
    <div>
      <div id="grid-container">
        <h1>Our Products</h1>
        <ul className="products">
          {products.map(product => {
            return (
              <li key={product.id}>
                <div className="product">
                  <Link to={`products/${product.id}`}>
                    <h1>{product.name}</h1>
                  </Link>
                  <img src={product.imageUrl} alt={product.name} />
                  <h3>${product.price / 100}.00</h3>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default AllProducts
