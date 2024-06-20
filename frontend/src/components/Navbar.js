import React from 'react'
import './css/nav.css'

function Navbar() {
  return (
    <div className='nav'>
      <a href='/'>
      <img id="logo" src="https://thumbs.dreamstime.com/b/ebook-logo-icon-design-vector-format-149384208.jpg"height="125" width="125" alt="VPPCOE logo" />
      <h1>E-Book Maker</h1>
      </a>
    </div>
  )
}

export default Navbar