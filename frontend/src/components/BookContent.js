import React, { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './css/bookcontent.css'

function BookContent() {
    const location = useLocation()
    const {title, cover} = location.state
    const [content, setContent] = useState(null)
    const navigate = useNavigate()

    const publishHandler = () =>{

      const data = new FormData()
      data.append('coverimg', cover)
      data.append('title', title)
      data.append('content', content)

      axios.post('http://localhost:8085/', data)
      .then((res) => {
          if(res.data.msg == "published"){
              window.alert("Book publised")
              navigate('/')
          }else{
            window.alert("Try publishing again")
          }
      })
      .catch((err) =>{ window.alert(err.message)})
    }

  return (
    <div className='content'>
        <h1>{title}</h1>
        <textarea input onChange={(e) => setContent(e.target.value)} type='textarea' />
        <button onClick={publishHandler} type='button'>Publish</button>
    </div>
  )
}

export default BookContent