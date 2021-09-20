import React from 'react'
import { useRecoilState } from 'recoil'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiTrash } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'

import { filterRemoveCourse, getCourseKey } from '../courseUtil'
import Button from '../components/Button'
import CourseTitle from '../components/CourseTitle'
import { courseCartState } from '../recoil/courseCart'

// todo: actually show important data and use json to show header and whatnot..
//  then big checkout button
const Cart = () => {
  const [courseCart, setCourseCart] = useRecoilState(courseCartState)

  const removeCourse = (c: CourseSelector) => {
    setCourseCart((currentCart) => filterRemoveCourse(currentCart, c))
  }

  // todo: use useEffect to fetch details for each course and display them
  return (
    <div className="mx-5 mb-5 relative">
      <ul className="">
        <AnimatePresence>
          {courseCart.map((course) => {
            const courseKey = getCourseKey(course)
            return (
              <motion.li
                key={courseKey}
                exit={{ height: '0px' }}
                transition={{ ease: 'easeInOut' }}
                className="flex items-center overflow-y-hidden h-14"
              >
                <CourseTitle course={course} />
                <Button
                  className="ml-auto text-xl"
                  onClick={((e) => {
                    e.preventDefault()
                    removeCourse(course)
                  })}
                  variant="remove"
                  symmetrical
                >
                  <FiTrash />
                </Button>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>
      { courseCart.length === 0 ? <div className="text-xl text-gray-400"> You have no courses selected! </div> : null }
      <div className="flex my-5">
        <Link to="/courses" className="text-xl text-gray-500 px-4 py-2 rounded bg-gray-100 inline-block">
          <FiArrowLeft className="inline-block" />
          {' '}
          Back to Catalog
        </Link>
        <Button
          className="ml-auto text-xl inline-block"
          variant="confirm"
        >
          Confirm Selection
        </Button>
      </div>
    </div>
  )
}

export default Cart
