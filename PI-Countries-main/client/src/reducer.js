const initialState = {
    countries: [],
    myCountry:[],
    myActivity: [],
}

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case "GET_COUNTRIES":
            return {
                ...state.countries,
                countries: action.payload,
            }

        case "GET_DETAILS":
            return{
                ...state.myCountry,
                myCountry: action.payload,
            }

        case "GET_BY_NAME":
            return {
                ...state.myCountry,
                countries: action.payload,
            }

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
             return {
                ...state.countries,
                countries: action.payload,
            }

        case "ORDER_BY_POPULATION":
            let sortPopulation = action.payload === "desc" ? 
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


            default: return state
    }
}