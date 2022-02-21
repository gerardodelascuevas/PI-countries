import { Link } from 'react-router-dom'
import './card.css'

export default function Card({name, flag, continent, id }){

    return (
        <div className="card">
            <img src={flag} alt={name} className='bandera'/>
            <h3>{name}</h3>
            <h4> {continent} </h4>
           
            {/* <h5>{id} </h5> */}

            <Link to={`/countries/${id}`}>
                <button > Go to the Details </button>
            </Link>
        </div>
    )
}