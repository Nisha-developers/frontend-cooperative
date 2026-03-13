import React from 'react'

const Modal = ({message, icon}) => {
  return (
    <div>
    <div>{icon}</div>
    <div>{message}</div>
    </div>
  )
}

export default Modal