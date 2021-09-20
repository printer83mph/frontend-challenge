import { atom } from 'recoil'
import { getCourseKey } from '../courseUtil'

// where we cache our class details
const courseDetailsState = atom({
  key: 'courseDetailsState',
  default: {},
})

// async fetches details and updates recoil state man
const fetchCourseDetails = async (course: CourseSelector) => {
  const response = await fetch(`https://api.pennlabs.org/registrar/search?q=${getCourseKey(course)}`)
  const data = await response.json()
  return data
}

// eslint-disable-next-line import/prefer-default-export
export { courseDetailsState, fetchCourseDetails }
