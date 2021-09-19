import { atom } from 'recoil'

// where we cache our class details
const courseDetailsState = atom({
  key: 'courseDetailsState',
  default: {},
})

// async fetches details and updates recoil state man
const fetchCourseDetails = async ({ dept, number }: { dept: string, number: number }) => {
  const response = await fetch(`https://api.pennlabs.org/registrar/search?q=${dept.toLowerCase()}-${number}`)
  const data = await response.json()
  return data
}

// eslint-disable-next-line import/prefer-default-export
export { courseDetailsState, fetchCourseDetails }
