import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import AllCategories from './components/all-catergories'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <AllCategories />
    </div>
  )
}

export default App
