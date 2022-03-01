import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { myCountry, getCountries } from "../actions"
import ActivityCreate from "./activity-create"
import './detail.css'

export default function Detail(){
    const { id } = useParams()
    const dispatch = useDispatch()
    // const theCountry = useSelector(state=> state.myCountry)
    // useEffect(()=> dispatch(myCountry(id)), [dispatch])
    // console.log(theCountry)
    const allCountries = useSelector(state=> state.countries)
    useEffect(()=> dispatch(getCountries()), [])
    //console.log(allCountries)
    
    const theCountry = allCountries.find(x=> {
        return x.id == id
    })
    console.log(theCountry.activities.map(x=> x))

    return ( 
        // <h1>ola ke ase </h1>
        <div className="main-container"> 
        <div className="card-detail">
            <img className='flag-detail' src={theCountry.flag} alt={theCountry.name} />
            <h3> {theCountry.name} </h3>
            <h4> {theCountry.id.length > 3 ? theCountry.id.slice(0, 3).toUpperCase() : theCountry.id} </h4>
            <h4>Capital: {theCountry.capital}</h4>
            <h5>Subregion: {theCountry.subregion}</h5>
            <h5>Superficie: {theCountry.superficie} km2 </h5>
            <h5>Population: {theCountry.population} </h5>  
            {/* <h5> Activities: {theCountry.activities.length ? theCountry.activities.map(x=> x.name) : "We don't have activities yet"}</h5>            */}
            <div>
                <h5> Activities: {theCountry.activities.length ? theCountry.activities.map(x=> {
                    return <span>{x.name + " "}</span> 
                }) : "We don't have activities yet"}</h5>
                 {theCountry.activities !== null  ? //QUITAR ESTO 
                 <h5> Activities duration: {theCountry.activities.length ? theCountry.activities.map(x=> {
                    return <span>{x.duration + ' '}</span> 
                }) : ""}</h5> : null } 
                 <h5> Activities season: {theCountry.activities.length ? theCountry.activities.map(x=> {
                    return <span>{x.season + " "}</span> 
                }) : ""}</h5>
                 <h5> Activities difficult: {theCountry.activities.length ? theCountry.activities.map(x=> {
                    return <span>{x.difficult + " "}</span> 
                }) : ""}</h5> 
            </div>
            <Link to='../countries'>
                <button> Back to home! </button>
            </Link>
        </div>
        </div>
    )
}