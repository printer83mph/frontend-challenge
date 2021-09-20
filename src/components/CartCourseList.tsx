import React from 'react'
import { useRecoilState } from 'recoil'
import { AnimatePresence, motion } from 'framer-motion'
import { FiTrash } from 'react-icons/fi'
import Button from './Button'
import CourseTitle from './CourseTitle'
import { filterRemoveCourse, getCourseKey } from '../courseUtil'
import { courseCartState } from '../recoil/courseCart'

// list of classes on our cart page
const CartCourseList = () => {
  const [courseCart, setCourseCart] = useRecoilState<Array<Course>>(courseCartState)

  const removeCourse = (c: CourseSelector) => {
    setCourseCart((currentCart) => filterRemoveCourse(currentCart, c))
  }

  return (
    <ul>
      <AnimatePresence>
        {courseCart.map((course) => {
          const courseKey = getCourseKey(course)
          return (
            <motion.li
              key={courseKey}
              exit={{ height: '0px', opacity: 0, x: '50vw' }}
              transition={{ ease: 'easeInOut' }}
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
          ? (
            <motion.div
              className="text-xl text-gray-400 overflow-y-hidden"
              initial={{ height: '0' }}
              animate={{ height: 'auto' }}
              transition={{ ease: 'easeInOut' }}
            >
              {' '}
              You have no courses selected!
            </motion.div>
          )
          : null }
      </AnimatePresence>
    </ul>
  )
}

export default CartCourseList
