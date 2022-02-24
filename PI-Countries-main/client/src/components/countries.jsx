import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByActivity, getCountries, orderByContinent, orderByName, orderByPopulation, orderBySuperficie } from '../actions'
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
    let currentCountry = allCountries.length > 1 ? allCountries.slice(firstCountry, lastCountry) : allCountries

    let pagination = n=> setPages(n)
    //FIN DE LOGICA DE PAGINADO     

    //INICIO DE LOGICA DE BUSQUEDA POR NOMBRE
    const navigate = useNavigate()
    const [name, setName] = useState('')

    const buscando= (e)=> { //e es el valor del input
       setName(e)
    }
    // const funcionParaBuscarElPais = (e)=> {
    //     e.preventDefault()
    //     dispatch(myCountryByName(name))
    //     setPages(1)
    //     setName('')
    // }

    let myId = allCountries.find(x=> {
        if(x.name.toLowerCase() == name.toLowerCase())
        return x.id
    })
    const funcionParaBuscarElPais = ()=> {
        myId ? 
         navigate(`./${myId.id}`) : alert("Sorry your country doesn't exist")
    }
   

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

    //INICIO DE LOGICA DE ORDENAMIENTO POR ACTIVIDAD
    let paisesfiltrados = allCountries.filter(x=> { //AQUI TENGO LOS PAISES CON ACTIVIDADES 
        return x.activities.length ? x.activities : null
    })
    let actividadesnombre = paisesfiltrados.map(x=>{ //FILTRAR SOLO NOMBRES
        return x.activities.map(x=> x.name)
    })
   let actividadesnombreplain = actividadesnombre.flat()   //aplanar actividadesnombre
   let actividadeslistasparamostrar = actividadesnombreplain.reduce((a, e) =>{ //ELIMINAR DUPLICADOS
    if(!a.find(d=> d===e)) a.push(e)
    return a
   }, []) 

   const [ordbyact, setOrdbyact] = useState('')
   const filtrarporactividad = (e)=> {
       dispatch(filterByActivity(e))
       setPages(1)
       setOrdbyact(`order ${e}`)
   }
    //FIN DE LOGICA DE ORDENAMIENTO POR ACTIVIDAD
    
//    console.log(currentCountry)
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
                    {/* <option value="Antarctica">Antartida</option> */}
                    <option value="Asia"> Asia </option>
                    <option value="Europe">Europe</option>                    
                    <option value="Oceania">Oceania</option>               
              </select>      

                <select onChange={e=> orderbypopulation(e.target.value)} className='population'>
                    <option > Order by population </option>
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>    
                </select>  

                <select className='superficie' onChange={e=> ordthesup(e.target.value)}>
                    <option > Order by superficie </option>
                    <option value="asc">ASC</option>
                    <option value="desc">DSC</option>    
                </select>

                <select className='activities' onChange={e=> filtrarporactividad(e.target.value)}>
                    <option value=""> Activities </option>
                    {actividadeslistasparamostrar.map(x=> <option value={x} key={x}> { x } </option>)}                      
                </select>  

                <Link to= '../activity' > 
                    <button> Create your own Activity </button>
                </Link>

            </section> 

            <input placeholder='Type for search your Country! 'onChange={e=> buscando(e.target.value)} />
            <button onClick={e=> funcionParaBuscarElPais(e)}> Go to search! </button>
        <div className='main-container'>
            
            {currentCountry.map(x=> {
                return <Card key={x.id} flag= {x.flag} name= {x.name} continent= {x.continent} id={x.id}/>
            })}
        </div>
        </div>
    )
}