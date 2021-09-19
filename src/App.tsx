import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Nav from './components/Nav'
import CourseSelect from './pages/CourseSelect'

const App = () : JSX.Element => (
  <RecoilRoot>
    <Router>
      <Nav />
      <Route path={['/courses/', '/courses/:course']} component={CourseSelect} />
    </Router>
  </RecoilRoot>
)

export default App
