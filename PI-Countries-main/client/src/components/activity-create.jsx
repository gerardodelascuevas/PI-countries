import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { postMyActivity } from "../actions"
import './activity-create.css'


export default function ActivityCreate(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const allCountries = useSelector(state => state.countries)
    //console.log(allCountries)

   const [country, setCountry] = useState([])

    const [myActivity, setMyActivity]  = useState({
        countries: country,
        name: '',
        season: '',
        duration: '',
        difficult: '',
    })

    const handlechange = (e)=> {
        setMyActivity({
            ...myActivity,
           countries : [country],
            [e.target.name] : e.target.value
        })
    }

    const handleSelectCountry = (e)=> {       
        setCountry([...country, e.target.value])
        
    }

    console.log(myActivity)
    console.log(country)

    const handleCreateActivity = (e)=> {
        //e.preventDefault()
        dispatch(postMyActivity(myActivity))
        alert("Your activity has been created correctly")

        setMyActivity({
        countries: country,
        name: '',
        season: '',
        duration: '',
        difficult: '',
        })

        navigate('/countries')

    }
    return (
        <div className="activity-creates">

            <Link to='../countries'> 
                <button> Back to home </button>
            </Link>
            
            <select name="country" onChange={e=> handleSelectCountry(e)}> 
              
            { allCountries.map(x=> {
                return <option value={x.name}> { x.name } </option>  
            }) } 
                
            </select>
            <span className="span-country"> Your contries for this activity: { country } </span>
            
            <h6> Activity Name: <input type='text' name="name" onChange={handlechange}/> </h6>
            <h6> Season: 
                <select name="season" onChange={e=> handlechange(e)}>
                    <option value="summer">Summer </option>
                    <option value="fall"> Fall </option>
                    <option value="winter"> Winter </option>
                    <option value="sping"> Sping </option>    
                                
                </select>
              
            </h6>
            <h6> Duration: 
            <form oninput = "result.value = parseInt(range.value)">
                <input name="duration" id= 'range' type="range" min='1' max='300' onChange={handlechange}/> 
                <output name='result' for="range" > 5 </output>
            </form> 
             Hours </h6>
            <h6> Difficult: 
                <select name = 'difficult' onChange={handlechange}>
                    <option value="easy"> Easy </option>
                    <option value="intermediate"> Intermediate </option>
                    <option value="hard"> Hard </option>
                    <option value="extreme"> Extreme </option>
                </select>
            </h6>
            <button onClick={handleCreateActivity}> Click here to create the activity!  </button>
        </div>
    )
}