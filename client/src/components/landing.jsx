import React from 'react'
import './landing.css'
import { Link } from 'react-router-dom'

export default function Landing(){

    return (
        <div className='landing'>
            <h1 className='h1-mundo'>Hello world  </h1>
           <Link to ='./countries' >
           <button className='button-landing'> Come in to the countries of this world  </button>
           </Link>
        </div>
    )
}