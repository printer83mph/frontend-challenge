import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import Button from '../components/Button'
import { courseCartState } from '../recoil/courseCart'
import CartCourseList from '../components/CartCourseList'

const Cart = () => {
  const courseCart = useRecoilValue(courseCartState)

  // todo: use useEffect to fetch details for each course and display them
  // todo: draggable/rearrangeable items
  return (
    <div className="mx-5 mb-5 relative">
      <CartCourseList />
      <div className="flex my-5">
        <Link to="/courses" className="text-xl text-gray-500 px-4 py-2 rounded bg-gray-100 inline-block">
          <FiArrowLeft className="inline-block" />
          {' '}
          Back to Catalog
        </Link>
        <Button
          className="ml-auto text-xl inline-block"
          disabled={courseCart.length === 0}
          variant="confirm"
          onClick={() => alert('sorry the demo is over')}
        >
          Confirm Selection
        </Button>
      </div>
    </div>
  )
}

export default Cart
