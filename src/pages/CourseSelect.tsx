import React from 'react'

import Courses from '../components/CourseList'
import CartButton from '../components/CartButton'

const CourseSelect = () => (
  <div className="relative">
    <Courses />
    <CartButton />
  </div>
)

export default CourseSelect
