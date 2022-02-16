import React from 'react'
import './landing.css'
import { Link } from 'react-router-dom'

export default function Landing(){

    return (
        <div className='landing'>
            <h1 className='h1-mundo'>Hello world  </h1>
           <Link to ='./countries' >
           <button > Come in to the world  </button>
           </Link>
        </div>
    )
}