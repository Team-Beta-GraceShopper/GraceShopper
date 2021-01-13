import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

export class Sweaters extends React.Component {
  render() {
    return (
      <div>
        <h1>All Sweaters</h1>
        {robots.map(robot => (
          <div key={robot.id}>
            <h4>{robot.name}</h4>
            <Link to={`/robots/${robot.id}`}>
              <img src={robot.imageUrl} alt={`Image of ${robot.name}`} />
            </Link>
          </div>
        ))}
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
