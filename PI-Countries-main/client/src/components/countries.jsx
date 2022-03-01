import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filtermycountry, filterByActivity, getCountries, orderByContinent, orderByName, orderByPopulation, orderBySuperficie } from '../actions'
import Card from './card'
import './countries.css'
import Pagination from './pagination'
import Search from './search'
import { myCountryByName } from "../actions"
import { Link, useNavigate } from 'react-router-dom'
import Footer from './footer'

export default function Countries (){  
    const dispatch = useDispatch()
    let allCountries = useSelector(state=> state.countries)
    useEffect(()=> dispatch(getCountries()), [dispatch])

    //console.log(allCountries)    

    //HACER LOGICA DE PAGINADO 
    const [pages, setPages] = useState(1)
    const [countrypp] = useState(10)
     
    const countriesInPage = () => {
            const firstCountry = pages === 1 ? 0 : pages * 10 - 10;
            const lastCountry = pages === 1 ? 9 : firstCountry + 10;
            return allCountries.slice(firstCountry, lastCountry);
        }
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
        if(x.name.toLowerCase() == name.toLowerCase().trim())
        return x.id
    })
    const funcionParaBuscarElPais = ()=> {
        myId ? 
         navigate(`./${myId.id}`) : alert("Sorry your country doesn't exist")
    }
   
    const funcionparafiltrarelpais = (e)=> {
        let nombre = e.toLowerCase().trim()
        dispatch(filtermycountry(nombre))

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
        if(e=== 'primero') dispatch(getCountries())
       else {dispatch(orderByContinent(e))
        setPages(1)
        setContinent(`order ${e}`) }
    }

    let continentes = []
    allCountries.filter(x=> {
      let continente =  x.continent
      continentes.push(continente)
    })


    let continenteslistosparamostrar = continentes.reduce((a, e) =>{ //ELIMINAR DUPLICADOS
        if(!a.find(d=> d===e)) a.push(e)
        return a
       }, [])

       console.log(continenteslistosparamostrar)
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
       if(e === "activities") dispatch(getCountries())
       else {dispatch(filterByActivity(e))
       setPages(1)
       setOrdbyact(`order ${e}`)}
   }
    //FIN DE LOGICA DE ORDENAMIENTO POR ACTIVIDAD
    
   
    return (
        <div> 
            <section className='section-1'>   
            <Link to='../'>
                    <button className='primary-button'> Back to Landing </button>
             </Link>        
            <Pagination           
            allCountries = { allCountries }
            countrypp = { countrypp }
            pagina = { pagination }
            />
            <span className='main-span'> You are on page {pages}</span>
            </section>
           
            <section className='busquedas'>
             
                {/* <select onChange={e=> orderthename(e.target.value)} className='abc'>
                    <option> Order by ABC</option>
                    <option value="a-z"> A-Z </option>
                    <option value="z-a"> Z-A </option>
                </select>    */}  

              <div className='forms'>
                <form onChange={e=> orderthename(e.target.value)} className='abcorder'> <span>Order by abc</span>
                     <input type="radio" name='name' value='a-z' />
                     <label htmlFor="name">A - Z </label>
                     <input type="radio" name='name' value='z-a'/>
                     <label htmlFor="name">Z - A </label>                                              
                 </form>                              
                {/* <select onChange={e=> orderbypopulation(e.target.value)} className='population'>
                    <option > Order by population </option>
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>    
                </select>   */}
                <form onChange={e=> orderbypopulation(e.target.value)} className='population'><span>Order by population</span>
                    <input type="radio" name='name' value='asc' />
                    <label htmlFor="name">asc</label>
                    <input type="radio" name='name' value='desc'/>
                    <label htmlFor="name">desc</label>
                </form>
                {/* <select className='superficie' onChange={e=> ordthesup(e.target.value)}>
                    <option > Order by superficie </option>
                    <option value="asc">ASC</option>
                    <option value="desc">DSC</option>    
                </select> */}

                <form onChange={e=> ordthesup(e.target.value)} className='superficieorder'> <span>Order by Superficie</span>
                    <input type="radio" name='name' value='asc' />
                    <label htmlFor="name">asc</label>
                    <input type="radio" name='name' value='desc'/>
                    <label htmlFor="name">desc</label>
                </form>
                </div>  

                <select onChange={e=> orderbycontinentname(e.target.value)} className='continent'>
                    <option value='primero'> Order by Continent </option>    
                    <option value='Africa'> Africa </option>
                    <option value="Americas">America</option>
                    <option value="Antarctic">Antartida</option>
                    <option value="Asia"> Asia </option>
                    <option value="Europe">Europe</option>                    
                    <option value="Oceania">Oceania</option>               
                    {/* {continenteslistosparamostrar.map(x=> <option value={x}> {x} </option>)} */}

                    
              </select>

                <select className='activities' onChange={e=> filtrarporactividad(e.target.value)}>
                    <option value="activities" key='activities'> Activities </option>
                    {actividadeslistasparamostrar.map(x=> <option value={x} key={x}> { x } </option>)}                      
                </select>  

                <Link to= '../activity' > 
                    <button className='primary-button'> Create your own Activity </button>
                </Link>

            </section> 
                <div className='inputs'>
            <input placeholder='Search your Country! 'onChange={e=> buscando(e.target.value)} className='primary-input'/>
            <button type='submit' className='primary-button'
             onClick={e=> funcionParaBuscarElPais(e)}
             > I'm feel lucky! </button>

            <input placeholder='Filter your Country! ' className='filtercountry primary-input'
                onChange={e=> funcionparafiltrarelpais(e.target.value)}
            />             
        </div>
        <div className='main-container'>   

        {!allCountries.length ? <div><div className='spinner'></div> <h1 className='waiting'> Please wait is loading ... </h1></div>
        : null }  
         {/* {allCountries === undefined ? <div><div className='spinner'></div> <h1 className='waiting'> Please wait is loading ... </h1></div>
        : null }   */}
            
            {countriesInPage().map(x=> {
                return <Card key={x.id} flag= {x.flag} name= {x.name} continent= {x.continent} id={x.id}/>
            })}
            
        </div>
        <div className='button-container'> 
                <button className='primary-button prevnext prev' onClick={()=> pages!==1 ?  setPages(pages-1) : null}> Prev </button>
                <button className='primary-button prevnext next'onClick={()=> pages < 25 ? setPages(pages +1) : null}> Next </button>
        </div>
        <Footer />
        </div>
    )
}