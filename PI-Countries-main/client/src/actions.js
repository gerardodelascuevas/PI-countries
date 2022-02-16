import axios from 'axios'

export const getCountries = ()=> {
    return async dispatch=> {
        let json = await axios.get('http://localhost:3001/country')
        return dispatch({
            type: "GET_COUNTRIES",
            payload: json.data,
        })
    }
}

export const myCountry = (id)=> {

    return async dispatc=> {
        let json = await axios.get(`http://localhost:3001/country/${id}`)
        return dispatc({
            type: "GET_DETAILS",
            payload: json.data, 
        })
    }
}

export const myCountryByName = (name)=> {
    return async dispatch=> {
        let json = await axios.get(`http://localhost:3001/country?name=${name}`)
        return dispatch({
            type: "GET_BY_NAME",
            payload: json.data,
        })
    }
}