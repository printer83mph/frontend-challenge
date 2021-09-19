import { atom } from 'recoil'

const courseCart = atom({
  key: 'courseCartState',
  default: [],
})

// todo: implement selectors if needed

export default courseCart
