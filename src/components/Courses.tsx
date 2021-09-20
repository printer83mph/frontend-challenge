import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useRecoilState } from 'recoil'

import { FiPlus, FiTrash } from 'react-icons/fi'
import courses from '../data/courses.json'
import { courseCartState } from '../recoil/courseCart'
import Button from './Button'
import CourseDetails from './CourseDetails'
import CourseTitle from './CourseTitle'

const isCourseEqual = (c1: CourseSelector, c2: CourseSelector) => (c1.dept === c2.dept && c1.number === c2.number)

export default () => {
  const [courseCart, setCourseCart] = useRecoilState(courseCartState)
  const { course: selectedCourse } = useParams<{ course?: string }>()

  const courseSelected = (c: CourseSelector) => (courseCart.some((cartCourse) => isCourseEqual(cartCourse, c)))

  const canAddCourse = (c: CourseSelector) => (courseCart.length < 7)
      && !courseSelected(c)

  const addCourse = (c: Course) => {
    // check if the course is already in our list or if we're at limit
    if (!canAddCourse(c)) return

    // if not then we add it
    // @ts-ignore
    setCourseCart((currentCart) => [...currentCart, c])
  }

  const removeCourse = (c: CourseSelector) => {
    setCourseCart((currentCart) => currentCart.filter((cartCourse) => !(isCourseEqual(cartCourse, c))))
  }

  return (
    <ul>
      {courses.map((course) => {
        const {
          dept, number, title, description,
        } = course

        const courseIsSelected = courseSelected(course)
        const onCurrentCourse = selectedCourse === `${dept}-${number}`

        return (
          <li key={`${dept}-${number}`} className={`px-4 md:rounded-xl transition-colors ${courseIsSelected && 'bg-gray-50'}`}>
            <NavLink
              to={onCurrentCourse ? '/courses' : `/courses/${dept}-${number}`}
              replace
            >
              <AnimatePresence initial={false}>
                <div className="py-3 my-1 flex items-center">
                  <CourseTitle dept={dept} number={number} title={title} />
                  <Button
                    className="ml-auto"
                    variant={courseIsSelected ? 'remove' : 'add'}
                    disabled={!canAddCourse(course) && !courseIsSelected}
                    onClick={(e) => {
                      e.preventDefault()
                      if (courseIsSelected) removeCourse(course)
                      else addCourse(course)
                    }}
                  >
                    { courseIsSelected ? <FiTrash /> : <FiPlus />}
                  </Button>
                </div>
                {onCurrentCourse && (
                  <motion.div
                    className="overflow-y-hidden flex flex-col lg:flex-row"
                    key="description"
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                  >
                    <div className="mb-3 md:pr-3" style={{ minWidth: '125px' }}>
                      <CourseDetails course={course} />
                    </div>
                    <p className="text-gray-500 pb-3">
                      {description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}
