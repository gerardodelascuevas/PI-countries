import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { postMyActivity } from "../actions"
import Footer from './footer'
import './activity-create.css'


export default function ActivityCreate(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const allCountries = useSelector(state => state.countries)
    //console.log(allCountries)

   const [country, setCountry] = useState([])

    const [myActivity, setMyActivity]  = useState({
        thecountries: country,
        name: '',
        season: '',
        duration: '',
        difficult: '',
    })

    const handlechange = (e)=> {
        setMyActivity({
            ...myActivity,
            thecountries : country,
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
        thecountries: country,
        name: '',
        season: '',
        duration: '',
        difficult: '',
        })

        navigate('/countries')
}


const [inputname, setInputname] = useState('')

const handlesearchcountryininput = (e)=> {
    setInputname(e)        
}
console.log(inputname)

const handlesearchcountryininputbutton = ()=>{
    let paisencontrado = allCountries.find(x=> x.name.toLowerCase() === inputname.toLowerCase())
    if(paisencontrado) return setCountry([...country, paisencontrado.name])
    else return alert("Sorry, country not found")
}    
    return (
        <div>
              <Link to='../countries'> 
                <button className="button-primary"> Back to home </button>
            </Link>
        <div className="activity-creates">

          
            <input type='search' placeholder='Type your country' onChange={e=> handlesearchcountryininput(e.target.value)}/> 
            <button onClick={handlesearchcountryininputbutton}> Search country</button> <br/>
            <select name="country" onChange={e=> handleSelectCountry(e)}> 
              
            { allCountries.map(x=> {
                return <option value={x.name}> { x.name } </option>  
            }) }  
                
            </select> <br/>{country.length < 1 ? 'Please select at least one country' : null} <br/>
            <span className="span-country"> <b>Your contries for this activity:</b> { country + " "}  </span> <br/>    
            <button onClick={e=> setCountry([])}> Clear your countries </button>
            
            <h6> Activity Name: <input type='text' name="name" onChange={handlechange}/> </h6>
            {myActivity.name.length < 3 ? 'Please select a name with more than 3 characters' : null}

            <h6> Season: 
                <select name="season" onChange={e=> handlechange(e)}>
                   
                    <option> Select the season </option>
                    <option value="summer">Summer </option>
                    <option value="fall"> Fall </option>
                    <option value="winter"> Winter </option>
                    <option value="sping"> Sping </option>    
                             
                </select> {!myActivity.season ? 'Please select a season' : null}
              
            </h6>
            <h6> Duration: 
            <form oninput = "result.value = parseInt(range.value)">
                <input name="duration" id= 'range' type="range" min='1' max='24' onChange={handlechange}/> {myActivity.duration}  Hours

            </form> 
             Hours </h6> {!myActivity.duration ? 'Please select a duration' : null}
            <h6> Difficult: 
                <select name = 'difficult' onChange={handlechange}>
                    <option> Select the difficult </option>
                    <option value="easy"> Easy </option>
                    <option value="intermediate"> Intermediate </option>
                    <option value="hard"> Hard </option>
                    <option value="extreme"> Extreme </option>
                </select>
            </h6>{!myActivity.difficult ? 'Please select a difficult' : null} <br/>
            <button className="creationbutton"
            onClick={handleCreateActivity}
            disabled={
                country.length < 1 || myActivity.name.length < 3 || !myActivity.season || !myActivity.duration || !myActivity.difficult
            }
            > Click here to create the activity!  </button>
        </div>
            <Footer />
        </div>
    )
}