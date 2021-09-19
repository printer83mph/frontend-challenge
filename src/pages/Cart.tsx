import React from 'react'
import { useRecoilValue } from 'recoil'
import { courseCartState } from '../recoil/courseCart'

// todo: actually show important data and use json to show header and whatnot..
//  then big checkout button
const Cart = () => {
  const courseCart = useRecoilValue(courseCartState)
  return (
    <div className="mx-5">
      {courseCart.map(({ dept, number }) => (
        <div>
          Hello
        </div>
      ))}
    </div>
  )
}

export default Cart
