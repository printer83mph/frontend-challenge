import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { courseDetailsState, fetchCourseDetails } from '../recoil/courseDetails'

type CourseDetailsProps = {
  dept: string,
  number: number
}

const activities = [
  'REC',
  'LEC',
  'LAB',
]

type Course = {
  activity: string
}

const courseActivityCount = (courses: Array<Course>,
  activity: typeof activities[number]) => {
  let count = 0
  courses.forEach((course: Course) => {
    if (course.activity === activity) count += 1
  })
  return count
}

const CourseDetails = ({ dept, number }: CourseDetailsProps) => {
  const [courseDetails, setCourseDetails] = useRecoilState(courseDetailsState)

  const courseKey = `${dept.toLowerCase()}-${number}`

  const updateDetails = async () => {
    const newData = await fetchCourseDetails({ dept, number })
    setCourseDetails((oldCourseDetails) => {
      const newObj = { ...oldCourseDetails }
      newObj[courseKey] = newData.courses
      return newObj
    })
  }

  useEffect(() => {
    updateDetails()
  }, [])

  const myData = courseDetails[courseKey]

  if (myData === undefined) {
    return <div> </div>
  }

  if (myData.length === 0) {
    return (
      <div className="text-gray-400">
        No course data found!
      </div>
    )
  }

  const lecCount = courseActivityCount(myData, 'LEC')
  const recCount = courseActivityCount(myData, 'REC')

  return (
    <div>
      <p className="text-gray-400">
        { lecCount ? `${lecCount} Lecture${lecCount > 1 ? 's' : ''}` : null}
      </p>
      <p className="text-gray-400">
        { recCount ? `${recCount} Recitation${recCount > 1 ? 's' : ''}` : null}
      </p>
    </div>
  )
}

export default CourseDetails
