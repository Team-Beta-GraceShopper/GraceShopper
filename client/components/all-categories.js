import React from 'react'
// import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'

const AllCategories = props => {
  console.log('all category props', props)
  const products = props.products
  return (
    <div>
      <div>
        {products.map(product => {
          return (
            <div key={product.id}>
              <h1>{product.categoryId}</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllCategories
