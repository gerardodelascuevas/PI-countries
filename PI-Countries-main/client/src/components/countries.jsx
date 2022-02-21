import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, orderByName } from '../actions'
import Card from './card'
import './countries.css'
import Pagination from './pagination'
import Search from './search'
import { myCountryByName } from "../actions"
import { Link, useNavigate } from 'react-router-dom'

export default function Countries (){  
    const dispatch = useDispatch()
    const allCountries = useSelector(state=> state.countries)
    useEffect(()=> dispatch(getCountries()), [dispatch])    

    //HACER LOGICA DE PAGINADO 
    const [pages, setPages] = useState(1)
    const [countrypp] = useState(9)

    let lastCountry = pages * countrypp
    let firstCountry = lastCountry - countrypp
    let currentCountry =  allCountries.slice(firstCountry, lastCountry)

    let pagination = n=> setPages(n)
    //FIN DE LOGICA DE PAGINADO     

    //INICIO DE LOGICA DE BUSQUEDA POR NOMBRE
    const navigate = useNavigate()
    const [name, setName] = useState('')

    const buscando= (e)=> { //e es el valor del input
       setName(e)
    }

    const funcionParaBuscarElPais = ()=> {
        navigate(`/${name}`)
        //dispatch(myCountryByName(name))

        //console.log(name)
    }
    //FIN DE LOGICA DE BUSQUEDA POR NOMBRE

    //INICIO DE LOGICA DE ORDENAMIENTO POR ORDEN ALFABETICO 
    const [ordByName, setOrdByName] = useState('')
    const orderthename = (e)=> {
        dispatch(orderByName(e))
       // setPages(1)
      //  setOrdByName(`order ${e}`)
    }

    //FIN DE LA LOGICA DE ORDENAMIENTO POR ORDEN ALFABETICO
    
    
    return (
        <div> 
            <section className='section-1'>             
            <Pagination           
            allCountries = { allCountries }
            countrypp = { countrypp }
            pagina = { pagination }
            />
            <span> You are on page {pages}</span>
            </section>

            <section>
                <select onChange={e=> orderthename(e.target.value)} >
                    <option> Order by ABC</option>
                    <option value="a-z"> A-Z </option>
                    <option value="z-a"> Z-A </option>
                </select>
            </section>

            <Search 
            miFuncion={buscando}
            laDeBuscar={funcionParaBuscarElPais}
            />            
            <Link to= '../activity' > 
                <button> Create your own Activity </button>
            </Link>
        <div className='main-container'>
            
            {currentCountry.map(x=> {
                return <Card key={x.id} flag= {x.flag} name= {x.name} continent= {x.continent} id={x.id}/>
            })}
        </div>
        </div>
    )
}