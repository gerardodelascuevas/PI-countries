const initialState = {
    countries: [],
    myCountry:[],
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
                myCountry: action.payload,
            }

        case "ORDER_BY_NAME":
            let sortName = action.payload === "a-z"
            state.countries.sort((a,b)=> {
                if(a.name<b.name) return -1
                else return 0
            })
            return {
                ...state,
                countries: sortName,
            }


            default: return state
    }
}