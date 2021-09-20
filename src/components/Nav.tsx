import React from 'react'
import { FiZap } from 'react-icons/fi'

const Nav = () : JSX.Element => (
  <>
    <nav
      className="container mx-auto py-4 px-5 flex justify-between items-center fixed cursor-default z-10 bg-white"
    >
      <h1 className="text-2xl font-bold tracking-tight">
        <FiZap className="inline mr-4" />
        Penn Course Select
      </h1>
      <div className="text-gray-500">
        {/* todo: in theory there would be a (expandable) nav here */}
        {/* { pages.map(({ name, to }) => ( */}
        {/*  <NavLink */}
        {/*    key={to} */}
        {/*    to={to} */}
        {/*    activeClassName="font-bold" */}
        {/*  > */}
        {/*    {name} */}
        {/*  </NavLink> */}
        {/* )) } */}
      </div>
    </nav>
    <div style={{ height: '4rem' }} />
  </>
)

export default Nav
