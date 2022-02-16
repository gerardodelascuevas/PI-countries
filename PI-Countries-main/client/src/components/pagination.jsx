import './pagination.css'

export default function Pagination({ allCountries, countrypp, pagina }){
    let pages = []
    // console.log(countrypp)
    // console.log(Math.ceil(allCountries / countrypp))

    for(let i = 1; i <= Math.ceil(allCountries.length / countrypp); i++) pages.push(i)



    return (
        <nav>            
            <ol className="list-container" >
                { pages.map(x=> {
                    return <li key={x} className='list'>
                                 <button className="button" onClick={()=> pagina(x)}> { x } </button>
                           </li>
                })}
            </ol>
        </nav>
    )
}