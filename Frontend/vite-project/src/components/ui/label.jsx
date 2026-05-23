import React from "react"

const Label = ({ children, className }) => {
  return (
    <label className={`block mb-1 font-medium ${className}`}>
      {children}
    </label>
  )
}

export { Label }