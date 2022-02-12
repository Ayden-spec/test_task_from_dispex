import axios from 'axios'
import { Reducer_Set_Apartments, Reducer_Set_Houses, Reducer_Set_Streets } from '../reducers/adressReducers'

export const Action_Get_Streets = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://dispex.org/api/vtest/Request/streets?content-type=application/json; charset=utf-8`)
            dispatch(Reducer_Set_Streets(response.data))
        } catch (e) {
            alert(e)
        }
    }
}

export const Action_Get_House = (id) => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://dispex.org/api/vtest/Request/houses/${id}`)
            dispatch(Reducer_Set_Houses(response.data))
        } catch (e) {
            alert(e)
        }
    }
}

export const Action_Get_Apartment = (id) => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://dispex.org/api/vtest/Request/house_flats/${id}?content-type=application/json; charset=utf-8`)
            dispatch(Reducer_Set_Apartments(response.data))
        } catch (e) {
            alert(e)
        }
    }
}