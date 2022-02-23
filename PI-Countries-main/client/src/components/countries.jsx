import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, orderByContinent, orderByName, orderByPopulation, orderBySuperficie } from '../actions'
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
        dispatch(myCountryByName(name))
        setPages(1)
    }

    console.log(name)
    //FIN DE LOGICA DE BUSQUEDA POR NOMBRE

    //INICIO DE LOGICA DE ORDENAMIENTO POR ORDEN ALFABETICO 
    const [odrname, setOrdname] = useState ('') // --> sin esto se rompe 
    const orderthename = (e)=> {
        dispatch(orderByName(e))
        setPages(1)
      setOrdname(`order ${e}`)    //--> sin esto rompe 
    }

    //FIN DE LA LOGICA DE ORDENAMIENTO POR ORDEN ALFABETICO
    
    //INICIO DE LOGICA DE ORDENAMIENTO POR CONTINENTE 
   const [continent, setContinent] = useState('')
    const orderbycontinentname = (e)=> {
        dispatch(orderByContinent(e))
        setPages(1)
        setContinent(`order ${e}`) 
    }

    //FIN DE LOGICA DE ORDENAMIENTO POR CONTINENTE

    //INICIO DE LOGICA DE ORDENAMIENTO POR POBLACION 
    const [ordpop, setOrdpop] = useState('')
    const orderbypopulation = (e)=> {
        dispatch(orderByPopulation(e))
        setPages(1)
        setOrdpop(`order ${e}`)
    }

    //FIN DE LOGICA DE ORDENAMIENTO POR POBLACION 

    //INICIO DE LOGICA DE ORDENAMIENTO POR TERRITORIO
    const [ordsup, setOrdsup] = useState ('') // --> sin esto se rompe 
    const ordthesup = (e)=> {
        dispatch(orderBySuperficie(e))
       setPages(1)
       setOrdsup(`order ${e}`)    //--> sin esto rompe 
    }
    //FIN DE LOGICA DE ORDENAMIENTO POR TERRITORIO 
    
    console.log(currentCountry)
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

            <section className='busquedas'>
                <select onChange={e=> orderthename(e.target.value)} className='abc'>
                    <option> Order by ABC</option>
                    <option value="a-z"> A-Z </option>
                    <option value="z-a"> Z-A </option>
                </select>   

                <select onChange={e=> orderbycontinentname(e.target.value)} className='continent'>
                    <option > Order by Continent </option>    
                    <option value='Africa'> Africa </option>
                    <option value="Americas">America</option>
                    <option value="Antartic">Antartida</option>
                    <option value="Asia"> Asia </option>
                    <option value="Europe">Europe</option>                    
                    <option value="Oceania">Oceania</option>               
              </select>      

                <select onChange={e=> orderbypopulation(e.target.value)} className='population'>
                    <option > Order by population </option>
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>    
                </select>  

                <select className='superficie' onChange={e=> ordthesup(e)}>
                    <option > Order by superficie </option>
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>    
                </select>

                <select className='activities'>
                    <option value=""> Activities </option>    
                </select>  

                <Link to= '../activity' > 
                    <button> Create your own Activity </button>
                </Link>

            </section> 
            {/* 
            <Search onChange={e=> funcionParaBuscarElPais(e.target.value)}
            miFuncion={funcionParaBuscarElPais}
            laDeBuscar={funcionParaBuscarElPais}
            />  */}

            <input placeholder='Type for search your Country! 'onChange={e=> buscando(e.target.value)} />
            <button onChange={e=> funcionParaBuscarElPais(e.target.value)}> Go to search! </button>
        <div className='main-container'>
            
            {currentCountry.map(x=> {
                return <Card key={x.id} flag= {x.flag} name= {x.name} continent= {x.continent} id={x.id}/>
            })}
        </div>
        </div>
    )
}