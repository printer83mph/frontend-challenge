import React from 'react'

import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Nav from './components/Nav'
import CourseSelect from './pages/CourseSelect'
import Cart from './pages/Cart'
import PageNotFound from './pages/PageNotFound'

const App = () : JSX.Element => (
  <RecoilRoot>
    <Router>
      <div className="container relative">
        <Nav />
        <Switch>
          <Route path={['/courses/', '/courses/:course']} exact component={CourseSelect} />
          <Route path="/cart" exact component={Cart} />
          <Redirect to="/courses" from="/" exact />
          <Route path="/404" component={PageNotFound} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </Router>
  </RecoilRoot>
)

export default App
