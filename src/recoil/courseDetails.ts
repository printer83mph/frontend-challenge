import { atom } from 'recoil'

const courseDetailsState = atom({
  key: 'courseDetailsState',
  default: {},
})

const fetchCourseDetails = async ({ dept, number }: { dept: string, number: number }) => {
  const response = await fetch(`https://api.pennlabs.org/registrar/search?q=${dept.toLowerCase()}-${number}`)
  const data = await response.json()
  return data
}

// eslint-disable-next-line import/prefer-default-export
export { courseDetailsState, fetchCourseDetails }
