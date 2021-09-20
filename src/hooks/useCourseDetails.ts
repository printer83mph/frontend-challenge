import { useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { courseDetailsState, fetchCourseDetails } from '../recoil/courseDetails'
import { getCourseKey } from '../courseUtil'

const activities = [
  'REC',
  'LEC',
  'LAB',
]

const useCourseDetails = (course: CourseSelector) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Array<CourseFetched> | null>(null)

  // use our big course details store state
  const [courseDetails, setCourseDetails] = useRecoilState(courseDetailsState)

  const courseKey = getCourseKey(course)

  // util functions

  // function to get the number of a specific type of course meetings there are
  const courseActivityCount = (
    activity: typeof activities[number],
  ) => {
    let count = 0
    data.forEach((c: CourseFetched) => {
      if (c.activity === activity) count += 1
    })
    return count
  }

  // function to get prereqs for a list of fetched courses
  const coursePrereqs = () => {
    const out: Array<string> = []
    data.forEach(({ prerequisite_notes }) => {
      prerequisite_notes.forEach((prereq) => {
        if (out.indexOf(prereq) === -1) out.push(prereq)
      })
    })

    return out
  }

  const updateLoading = () : void => {
    if (courseDetails[courseKey] === undefined) return
    setData(courseDetails[courseKey])
    setLoading(false)
  }

  // on render we will fetch our data!
  useEffect(() : void => {
    // check if we've already fetched before
    updateLoading()

    // fetch either way
    const updateDetails = async () => {
      const newData = await fetchCourseDetails(course)
      setCourseDetails((oldCourseDetails) => {
        const newObj = { ...oldCourseDetails }
        newObj[courseKey] = newData.courses || []

        return newObj
      })
    }

    updateDetails()
  }, [courseKey])

  // update our data if big data is updated
  useEffect(() : void => {
    updateLoading()
  }, [courseDetails])

  return {
    loading, data, courseActivityCount, coursePrereqs,
  }
}

export default useCourseDetails
