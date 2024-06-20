import React, { Fragment } from 'react'
import Navbar from './Navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Notfound from './Notfound'
import BookTitle from './BookTitle'
import BookContent from './BookContent'
import Book from './Book'

function App() {
  return (
    <Fragment>
        <Navbar/>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/book/title' element={<BookTitle/>}/>
                <Route path='/book/content' element={<BookContent/>}/>
                <Route path='/book/:id' element={<Book />}/>
                <Route path='/*' element={<Notfound/>}/>
            </Routes>
        </BrowserRouter>
    </Fragment>
  )
}

export default App