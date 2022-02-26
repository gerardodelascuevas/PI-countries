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

    return async dispatch=> {
        let json = await axios.get(`http://localhost:3001/country/${id}`)
        return dispatch({
            type: "GET_DETAILS",
            payload: json.data, 
        })
    }
}


//export const myCountryByName = (name)=> {
    // return async dispatch=> {
    //     try {
    //         let json = await axios.get(`http://localhost:3001/country?name=${name}`)
    //     return dispatch({
    //         type: "GET_BY_NAME",
    //         payload: json.data,
    //     })
    //     } catch(e) {console.log('algo fallo en la peticion my country by name ' + e)}        
    // }
    export const myCountryByName = (payload)=> {
    return {
        type: "GET_BY_NAME",
        payload
    }
}

export const orderByName = (payload)=> {
  return {
      type: "ORDER_BY_NAME",
      payload
  }
}

// export const orderByContinent = (continent)=> {
//     return async dispatch => {
//         let json = await axios.get(`http://localhost:3001/countries?continent=${continent}`)
//         return dispatch ({
//             type: "ORDER_BY_CONTINENT",
//             payload: json.data
//         })
//     }
// }

export const orderByContinent = (payload)=> {
    return {
        type: "ORDER_BY_CONTINENT",
        payload,
    }
 }

export const orderBySuperficie = (payload)=> {
    return {
        type: "ORDER_BY_TERRITORY",
        payload,
    }
}

export const orderByPopulation = (payload)=> {
    return {
        type: "ORDER_BY_POPULATION",
        payload,
    }
}

export const postMyActivity = (payload)=> {
    return async(dispatch)=> {
        const response = await axios.post(`http://localhost:3001/activity`, payload)
        return response
    }
}

export const getMyName = (payload)=> {
    return {
        type: "GET_BY_NAME",
        payload
    }
}

export const filterByActivity = (payload)=> { 
    return {
        type: "FILTER_ACTIVITIES",
        payload
    }
}