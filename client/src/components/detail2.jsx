import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getCountries, myCountry } from "../actions"
import './detail.css'

export default function Detail(){
    const { id } = useParams() 
    const dispatch = useDispatch()     
    dispatch(myCountry(id))
    let  theCountry = useSelector(state=> state.myCountry)


    return (  
        <div className="card-detail">
               
            <img className='flag-detail' src={theCountry ? theCountry.flag : null} alt={theCountry.name} />
            <h3> {theCountry ? theCountry.name : 'please wait'} </h3>        
            <h4>Capital: {theCountry ? theCountry.capital: null}</h4>
            <h5>Subregion: {theCountry ?theCountry.subregion : null}</h5>
            <h5>Superficie: {theCountry ?theCountry.superficie : null} km2 </h5>
            <h5>Population: {theCountry ?theCountry.population : null} </h5>  
            <div>
  
            </div>
             <Link to='../countries'>
                <button> Back to home! </button>
            </Link>
         </div>
         
    )
}