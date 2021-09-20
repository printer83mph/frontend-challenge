import React from 'react'
import { useRecoilState } from 'recoil'
import { AnimatePresence, motion } from 'framer-motion'
import { FiTrash } from 'react-icons/fi'
import Button from './Button'
import CourseTitle from './CourseTitle'
import { filterRemoveCourse, getCourseKey } from '../courseUtil'
import { courseCartState } from '../recoil/courseCart'
import useCourseDetails from '../hooks/useCourseDetails'

const CartCourseDetails = ({ course }: { course: CourseSelector }) => {
  const { loading, courseActivityCount, coursePrereqs } = useCourseDetails(course)
  if (loading) return null

  const lecCount = courseActivityCount('LEC')
  const recCount = courseActivityCount('REC')

  const prereqs = coursePrereqs()
  return (
    <motion.div
      className="flex gap-4 items-start mt-2 text-gray-500 overflow-y-hidden h-10"
      key="cartCourseDetails"
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
    >
      { lecCount > 0 ? (
        <p>
          {lecCount}
          {' '}
          Lecture
          {lecCount > 1 ? 's' : ''}
        </p>
      )
        : null }
      { recCount > 0 ? (
        <p>
          {recCount}
          {' '}
          Recitation
          {recCount > 1 ? 's' : ''}
        </p>
      )
        : null }
      { prereqs.length > 0
        ? (
          <p className="flex gap-1">
            Prereqs:
            { prereqs.map((prereq) => (
              <span key={prereq}>{prereq}</span>
            )) }
          </p>
        )
        : null }
    </motion.div>
  )
}

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
              key={`cart-list-${courseKey}`}
              exit={{ height: '0px', opacity: 0, x: '50vw' }}
              transition={{ ease: 'easeInOut' }}
              className="flex flex-col"
            >
              <div className="flex items-center pt-5">
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
              </div>
              <AnimatePresence>
                <CartCourseDetails course={course} />
              </AnimatePresence>
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
