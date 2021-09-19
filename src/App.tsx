import React from 'react'

import Nav from './components/Nav'
import Courses from './components/Courses'
import Cart from './components/Cart'

const App = () : JSX.Element => (
  // todo: no more inline!!
  <>
    <Nav />
    <div style={{
      width: '100%',
      boxSizing: 'border-box',
      padding: '0 calc(1rem + 10%)',
    }}
    >
      <Courses />
      <Cart />
    </div>
  </>
)

export default App
