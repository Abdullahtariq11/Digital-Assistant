import React from 'react'
import "./AlertModal.css"

export default function AlertModal({text}) {
  return (
    <div className='overlay-alert'>
        <h1>{text}</h1>
        </div>
  )
}
