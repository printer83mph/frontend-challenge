/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useRecoilValue } from 'recoil'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'

import { courseCartState } from '../recoil/courseCart'

type CartButtonProps = {

}

// the thing that pops up at the bottom when we have courses selected
const CartButton = (props: CartButtonProps) : JSX.Element => {
  const courseCart = useRecoilValue(courseCartState)
  return (
    <>
      <div style={{ height: '80px' }} />
      <AnimatePresence initial={false}>
        {courseCart.length > 0 && (
        <motion.div
          className="fixed container bottom-0 bg-white"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
        >
          <div className="py-5 px-5 flex items-center justify-between text-xl">
            <div>
              {/* todo: modal or something to show what courses we have selected */}
              <h2>
                <FiShoppingCart className="inline mr-4" />
                { courseCart.length }
                {' '}
                class
                {courseCart.length > 1 && 'es'}
                {' '}
                selected
              </h2>
            </div>
            <Link to="/cart" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 shadow text-white rounded font-bold">
              Checkout
            </Link>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CartButton
