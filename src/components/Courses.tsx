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

type Course = {
  dept: string,
  number: number
}

const isCourseEqual = ({ dept: d1, number: n1 }: Course, { dept: d2, number: n2 }: Course) => (d1 === d2 && n1 === n2)

export default () => {
  const [courseCart, setCourseCart] = useRecoilState(courseCartState)
  const { course } = useParams<{ course?: string }>()

  const courseSelected = (c: Course) => (courseCart.some((cartCourse) => isCourseEqual(cartCourse, c)))

  const canAddCourse = (c: Course) => (courseCart.length < 7)
      && !courseSelected(c)

  const addCourse = (c: Course) => {
    // check if the course is already in our list
    if (!canAddCourse(c)) return

    // if not then we add it
    // @ts-ignore
    setCourseCart((currentCart) => [...currentCart, c])
  }

  const removeCourse = (c: Course) => {
    setCourseCart((currentCart) => currentCart.filter((cartCourse) => !(isCourseEqual(cartCourse, c))))
  }

  return (
    <ul>
      {courses.map(({
        dept, number, title, description,
      }) => {
        const courseIsSelected = courseSelected({ dept, number })
        const onCurrentCourse = course === `${dept}-${number}`

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
                    disabled={!canAddCourse({ dept, number }) && !courseIsSelected}
                    onClick={(e) => {
                      e.preventDefault()
                      console.log(courseIsSelected)
                      if (courseIsSelected) removeCourse({ dept, number })
                      else addCourse({ dept, number })
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
                      <CourseDetails dept={dept} number={number} />
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
