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
            default: return state
    }
}