const initialState = {
    countries: [],
    //myCountry:[],
    allCountries: [],
    //totalCountries: [],

}

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case "GET_COUNTRIES":
            return {
                ...state.countries,
                 allCountries: action.payload,
                countries: action.payload,   
                //totalCountries: action.payload,            
            }

        // case "GET_DETAILS":
        //     return{
        //         ...state.myCountry,
        //         myCountry: action.payload,
        //     }


        case "ORDER_BY_NAME":
            let sortName = action.payload === "a-z" ? 
            state.countries.sort((a,b)=> {
                if( a.name < b.name ) return -1
                else return 0
            }) :
            state.countries.sort((a,b)=> {
                if( a.name > b.name ) return -1
                else return 0
            })
            return {
                ...state,
                countries: sortName,
            }

        case "ORDER_BY_CONTINENT":
            //  return {
            //     ...state.countries,
            //     countries: action.payload,
            // }      
            let allCountries = state.allCountries
            let myContinent = action.payload           
            let myCountriesInContinent = myContinent === "primero" ? allCountries : allCountries.filter(x=> { 
               return  x.continent.includes(myContinent) 
            })
            console.log(state.allCountries)         
            return {
                ...state,
                countries: myCountriesInContinent
            }


        case "ORDER_BY_POPULATION":
            let sortPopulation = action.payload === "asc" ? 
            state.countries.sort((a,b)=> {
                if(a.population < b.population) return -1
                else return 0
            }) 
            :
            state.countries.sort((a,b)=> {
                if(a.population > b.population) return -1
                else return 0
            })
            return {
                ...state,
                countries: sortPopulation,
            }

        case "ORDER_BY_TERRITORY":
            let sortTerritory = action.payload === "asc" ? 
            state.countries.sort((a,b)=> {
                if(a.superficie < b.superficie) return -1
                else return 0
            }) 
            :
            state.countries.sort((a,b)=> {
                if(a.superficie > b.superficie) return -1
                else return 0
            })
            return {
                ...state,
                countries: sortTerritory,
            }

        case "POST_ACTIVITY":
            return {
                ...state
            }

        case "FILTER_ACTIVITIES":
           // console.log(state.allCountries)
            let myactivity = action.payload
            let elpaisquebusco
             if(myactivity === "activities") {
                 elpaisquebusco = state.allCountries && state.allCountries
                }            
             else{
                 let filtrados = state.countries.filter(x=> {
                return x.activities.length ? x : null
            }) //paises con actividades creadas 
             elpaisquebusco = filtrados.filter(x=> {                
                  let mispaises = x.activities.find(x=> x.name === myactivity)
                  return mispaises                
            })
             }
              
            return {
                ...state.countries,
                countries: elpaisquebusco
            }
            case "FILTER_MY_COUNTRY":
                let mycountry = action.payload
                console.log(mycountry)
                let filtrado = state.allCountries.filter(x=> {
                   return x.name.toLowerCase().includes(mycountry.toLowerCase())                   
                })
                return {
                    ...state,
                    countries: filtrado}


            default: return state
    }
}