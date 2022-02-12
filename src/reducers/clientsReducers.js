const REDUCER_GET_CLIENTS_APARTMENTS_ID = 'REDUCER_GET_CLIENTS_APARTMENTS_ID'


const defaultstate = {
    clients: [],
}

export default function userReducers(state = defaultstate, action) {
    switch (action.type) {
        case REDUCER_GET_CLIENTS_APARTMENTS_ID:
            return {
                ...state,
                clients: action.payload,
            }

        default: return state;
    }
}

export const Reducer_Set_Clients_Apartments_Id = clients => ({ type: REDUCER_GET_CLIENTS_APARTMENTS_ID, payload: clients })