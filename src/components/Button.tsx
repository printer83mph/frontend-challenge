/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  variant: keyof typeof variants,
  disabled?: boolean,
  symmetrical?: boolean,
}

const variants = {
  confirm: 'bg-blue-500 hover:bg-blue-600',
  add: 'bg-green-500 hover:bg-green-600',
  remove: 'bg-red-600 hover:bg-red-700',
}

const Button = ({
  children, variant, className, disabled = false, symmetrical = false, ...props
}: ButtonProps & React.ComponentPropsWithoutRef<'button'>) => (
  <button
    className={`${symmetrical ? 'px-2' : 'px-4'} py-2 text-white rounded shadow transition ${variants[variant]} ${className} ${disabled && 'opacity-30'}`}
    type="button"
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
)

Button.defaultProps = {
  disabled: false,
  symmetrical: false,
}

export default Button
