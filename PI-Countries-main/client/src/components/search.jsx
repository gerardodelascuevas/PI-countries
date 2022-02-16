import { useState } from "react"
import { useDispatch } from "react-redux"
import { myCountryByName } from "../actions"


export default function Search({miFuncion, laDeBuscar}){
    const dispatch = useDispatch()

    // const [name, setName] = useState('')

    // function handleChangeInInput(evento) {        
    //     setName(evento.target.value)
    // }

    // function miFuncion(){
    //     const myCountry = dispatch(myCountryByName(name))
    //     console.log(myCountry)
    // }

    return (
        <div>
            <input type='text' placeholder='search your country' onChange={e=> miFuncion(e.target.value)}/> 
            <button onClick={()=>laDeBuscar()}> Click for search your country!! </button>            
        </div>
    )
}