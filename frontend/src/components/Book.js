import React from 'react'
import { useLocation } from 'react-router-dom'

function Book() {
    const location = useLocation()
    const bookdata = location.state
  return (
    <div>
        <h1>{bookdata.title}</h1>
        <h2>{bookdata.content}</h2>
    </div>
  )
}

export default Book