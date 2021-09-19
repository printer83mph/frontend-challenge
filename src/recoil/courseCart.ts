import { atom } from 'recoil'

const courseCartState = atom({
  key: 'courseCartState',
  default: [],
})

// todo: implement selectors if needed
// eslint-disable-next-line import/prefer-default-export
export { courseCartState }
