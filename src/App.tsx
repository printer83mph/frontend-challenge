import React from 'react'

import { BrowserRouter as Router } from 'react-router-dom'
import Nav from './components/Nav'
import Courses from './components/Courses'
import Cart from './components/Cart'

const App = () : JSX.Element => (
  // todo: no more inline!!
  <Router>
    <Nav />
    <article className="container">
      <Courses />
      <Cart />
    </article>
  </Router>
)

export default App
