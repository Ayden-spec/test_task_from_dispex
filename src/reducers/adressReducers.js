const REDUCER_GET_STREETS = 'REDUCER_GET_STREETS'
const REDUCER_GET_HOUSES = 'REDUCER_GET_HOUSES'
const REDUCER_GET_APARTMENT = 'REDUCER_GET_APPARTMENT'


const defaultstate = {
    streets: [],
    houses: [],
    apartments: [],
}

export default function userReducers(state = defaultstate, action) {
    switch (action.type) {
        case REDUCER_GET_STREETS:
            return {
                ...state,
                streets: action.payload,
            }
        case REDUCER_GET_HOUSES:
            return {
                ...state,
                houses: action.payload,
            }
        case REDUCER_GET_APARTMENT:
            return {
                ...state,
                apartments: action.payload,
            }

        default: return state;
    }
}

export const Reducer_Set_Streets = streets => ({ type: REDUCER_GET_STREETS, payload: streets })
export const Reducer_Set_Houses = house => ({ type: REDUCER_GET_HOUSES, payload: house })
export const Reducer_Set_Apartments = apartments => ({ type: REDUCER_GET_APARTMENT, payload: apartments })

