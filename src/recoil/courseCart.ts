import { atom } from 'recoil'

const courseCartState = atom<Array<Course>>({
  key: 'courseCartState',
  default: [],
})

// todo: implement selectors if needed
// eslint-disable-next-line import/prefer-default-export
export { courseCartState }
