import React from 'react'
import { useRecoilState } from 'recoil'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiTrash } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'

import { filterRemoveCourse, getCourseKey } from '../courseUtil'
import Button from '../components/Button'
import CourseTitle from '../components/CourseTitle'
import { courseCartState } from '../recoil/courseCart'

const Cart = () => {
  const [courseCart, setCourseCart] = useRecoilState(courseCartState)

  const removeCourse = (c: CourseSelector) => {
    setCourseCart((currentCart) => filterRemoveCourse(currentCart, c))
  }

  // todo: use useEffect to fetch details for each course and display them
  // todo: draggable/rearrangeable items
  return (
    <div className="mx-5 mb-5 relative">
      <ul className="">
        <AnimatePresence>
          {courseCart.map((course) => {
            const courseKey = getCourseKey(course)
            return (
              <motion.li
                key={courseKey}
                exit={{ height: '0px', opacity: 0, x: '50vw' }}
                transition={{ ease: 'easeOut' }}
                className="flex items-center h-14"
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
          { courseCart.length === 0
            ? <motion.div className="text-xl text-gray-400"> You have no courses selected! </motion.div>
            : null }
        </AnimatePresence>
      </ul>
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
