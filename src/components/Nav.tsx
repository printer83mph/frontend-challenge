import React from 'react'
import { NavLink } from 'react-router-dom'

const pages = [
  {
    name: 'Courses',
    to: '/courses',
  },
]

const Nav = () : JSX.Element => (
  <div className="container py-3 px-5 flex justify-between items-center">
    <h1 className="text-2xl font-bold tracking-tight">
      Penn Course Cart
    </h1>
    <nav className="text-gray-500">
      { pages.map(({ name, to }) => (
        <NavLink
          key={to}
          to={to}
          activeClassName="font-bold"
        >
          {name}
        </NavLink>
      )) }
    </nav>
  </div>
)

export default Nav
