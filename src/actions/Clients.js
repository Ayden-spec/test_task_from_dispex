import axios from 'axios'
import { Reducer_Set_Clients_Apartments_Id } from '../reducers/clientsReducers'

export const Action_Get_Clients_Apartmets_Id = (id) => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://dispex.org/api/vtest/HousingStock/clients?addressId=${id}`)
            dispatch(Reducer_Set_Clients_Apartments_Id(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const Action_Post_Client = (Name, Phone, Email) => {
    return async dispatch => {
        try {
            let data = JSON.stringify({ Name, Phone, Email })
            const response = await axios.post(`https://dispex.org/api/vtest/HousingStock/client`, data,
                {
                    headers: {
                        'Content-Type': 'application/json-patch+json',
                        'accept': 'application/json',
                    },
                }
            )
            dispatch(Action_Put_Bind_Client(response.data.id))
        } catch (e) {
            console.log(e)
        }
    }
}

export const Action_Put_Bind_Client = (ClientId) => {
    return async dispatch => {
        try {
            let element = JSON.parse(localStorage.getItem('apartment'))
            if(!element) return;
            let data = JSON.stringify({ AddressId: element.id, ClientId })
            const response = await axios.put(`https://dispex.org/api/vtest/HousingStock/bind_client`, data,
                {
                    headers: {
                        'Content-Type': 'application/json-patch+json',
                    },
                }
            )
            dispatch(Action_Get_Clients_Apartmets_Id(element.id))
        } catch (e) {
            console.log(e)
        }
    }
}

export const Action_Delete_Bind_Client = (id, update, callback) => {
    return async dispatch => {
        try {
            let element = JSON.parse(localStorage.getItem('apartment'))
            if(!element) return;
            const response = await axios.delete(`https://dispex.org/api/vtest/HousingStock/bind_client/${id}`)
            if(update){
                callback()
            }
            dispatch(Action_Get_Clients_Apartmets_Id(element.id))
        } catch (e) {
            console.log(e)
        }
    }
}

