import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { motion } from 'framer-motion'

import { courseDetailsState, fetchCourseDetails } from '../recoil/courseDetails'

const activities = [
  'REC',
  'LEC',
  'LAB',
]

// function to get the number of a specific type of course meetings there are
const courseActivityCount = (courses: Array<CourseFetched>,
  activity: typeof activities[number]) => {
  let count = 0
  courses.forEach((course: CourseFetched) => {
    if (course.activity === activity) count += 1
  })
  return count
}

// function to get prereqs for a list of fetched courses
const coursePrereqs = (courses: Array<CourseFetched>) => {
  const out: Array<string> = []
  courses.forEach(({ prerequisite_notes }) => {
    prerequisite_notes.forEach((prereq) => {
      if (out.indexOf(prereq) === -1) out.push(prereq)
    })
  })

  return out
}

type CourseDetailsProps = {
  course: CourseSelector
}

// shows details from cache + updates using useEffect
const CourseDetails = ({ course }: CourseDetailsProps) => {
  const { dept, number } = course
  const [courseDetails, setCourseDetails] = useRecoilState(courseDetailsState)

  const courseKey = `${dept.toLowerCase()}-${number}`

  const updateDetails = async () => {
    const newData = await fetchCourseDetails(course)
    setCourseDetails((oldCourseDetails) => {
      const newObj = { ...oldCourseDetails }
      newObj[courseKey] = newData.courses
      return newObj
    })
  }

  // grab that data
  useEffect(() => {
    updateDetails()
  }, [])

  // this will be a list of all the "course listings"
  const myData = courseDetails[courseKey]

  if (myData === undefined) {
    return <div> </div>
  }

  if (myData.length === 0) {
    return (
      <motion.div
        className="text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        No course data found!
      </motion.div>
    )
  }

  const lecCount = courseActivityCount(myData, 'LEC')
  const recCount = courseActivityCount(myData, 'REC')

  const prereqs = coursePrereqs(myData)

  return (
    <motion.div
      className="text-gray-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      { lecCount ? (
        <p>
          {lecCount}
          {' '}
          Lecture
          {lecCount > 1 ? 's' : ''}
        </p>
      ) : null}
      { recCount ? (
        <p>
          {recCount}
          {' '}
          Recitation
          {recCount > 1 ? 's' : ''}
        </p>
      ) : null}
      { prereqs.length > 0 ? (
        <div className="mt-2">
          Prereqs:
          { prereqs.map((prereq) => <p key={prereq}>{prereq}</p>)}
        </div>
      ) : null}
    </motion.div>
  )
}

export default CourseDetails
