import React from 'react'
import { motion } from 'framer-motion'

import useCourseDetails from '../hooks/useCourseDetails'

type CourseDetailsProps = {
  course: CourseSelector
}

// shows details from cache + updates using useEffect
const CourseDetails = ({ course }: CourseDetailsProps) => {
  const {
    loading, data, courseActivityCount, coursePrereqs,
  } = useCourseDetails(course)

  if (loading || data === null) {
    return <div> </div>
  }

  if (data.length === 0) {
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

  const lecCount = courseActivityCount('LEC')
  const recCount = courseActivityCount('REC')

  const prereqs = coursePrereqs()

  return (
    <motion.div
      className="text-gray-400 flex items-center md:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mr-6 md:mr-0">
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
      </div>
      { prereqs.length > 0 ? (
        <div className="mr-4 md:mt-2 md:mr-0">
          Prereqs:
          { prereqs.map((prereq) => <p key={prereq}>{prereq}</p>)}
        </div>
      ) : null}
    </motion.div>
  )
}

export default CourseDetails
