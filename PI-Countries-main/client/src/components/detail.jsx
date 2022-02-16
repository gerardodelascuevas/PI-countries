import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { myCountry } from "../actions"


export default function Detail(){
    const { id } = useParams()
    const dispatch = useDispatch()
    
    const theCountry = useSelector(state=> state.myCountry)
    useEffect(()=> dispatch(myCountry(id)), [dispatch])
    console.log(theCountry)


    return (
        <div>

        </div>
    )
}