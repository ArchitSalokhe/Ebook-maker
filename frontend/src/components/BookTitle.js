import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './css/booktitle.css'


function BookTitle() {
    const navigate = useNavigate()
    const [title, setTitle] = useState(null)
    const [cover, setCover] = useState([])
    const [prev , setPrev] = useState(null)
    
    const clickHandler = () =>{
        navigate('/book/content', {state: {
            title: title,
            cover: cover
        }})
    }

    const imgHandler = (e) =>{
        setCover(e.target.files[0])
        setPrev(URL.createObjectURL(e.target.files[0]))
    }

  return (
    <div className='editor'>
        <div className='tit'>
        <h1>Enter Book Title</h1>
        <input onChange={(e) => setTitle(e.target.value)} type='text'></input>
        </div>
        <div className='upload'>
        <img height='300' width='200' src={!prev ? 'https://picsum.photos/200/300' : prev} />
        <input onChange={imgHandler} type="file" accept="image/jpeg" />
        <button type='button' onClick={clickHandler}>Continue</button>
        </div>
        
    </div>
  )
}

export default BookTitle