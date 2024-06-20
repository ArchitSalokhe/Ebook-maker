import axios from 'axios'
import {useEffect, React, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './css/home.css'

function Home() {
    const navigate = useNavigate()
    const clickHandler = () =>{
        navigate('/book/title')
    }
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    const bookhandler = (c, t) =>{
        console.log(c,t )
        navigate(`/book/${t}`, {state: data[c]})
    }
    
    useEffect(() => {
        axios.get('http://localhost:8085/')
        .then((res) =>{
            setData([...res.data])
            setLoading(false)
            console.log(res)
        })
        .catch((err) =>{ window.alert("Server down")})
    },[])
    
  return (
    <div>
        <div className='create-button'>
            <div className='para'>
                <h1>Flagship eBook Maker Online</h1> 
                <p>Establish your thought leadership or generate leads with an engaging</p>
                <p>online book. Make an eBook for your business with our professional </p>
                <p>eBook templates and simple online eBook creator.</p>
                <button type='button' onClick={clickHandler}>Create Book</button>
            </div> 
        </div>
        <div className='books_section'>
            {loading ? '' : 
                data.map((item,i) =>{
                    return (
                        <div onClick={(e) => {bookhandler(e.currentTarget.className, item.title)}} href={`/book/${item.title}`} className={i}>
                        <div className='books'>
                            <img src={`http://localhost:8085/public/${item.cover.filename}`}  alt='coverpage'/>
                            <h2>{item.title}</h2>
                        </div>
                        </div>
                    )
                })
            }

        </div>

        
    </div>
  )
}

export default Home