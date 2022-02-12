import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Action_Get_Apartment, Action_Get_House, Action_Get_Streets } from '../../actions/Adress'
import { Action_Delete_Bind_Client, Action_Get_Clients_Apartmets_Id } from '../../actions/Clients'
import Input from '../Input/Input'

import Img_Delete from '../../assets/images/delete.png'
import Img_Update from '../../assets/images/update.png'
import Img_Add_Client from '../../assets/images/add_client.png'
import './HomePage.css'

function HomePage({ SetWindow_id, SetClient }) {
    const [Street, SetStreet] = useState('');
    const [House, SetHouse] = useState('');
    const [Apartment, SetApartment] = useState('');

    const Get_Street = (e) => {
        SetStreet(e)
        let obj = streets.find(element => element.name === e)
        if (obj !== undefined) {
            dispatch(Action_Get_House(obj.id))
            localStorage.setItem('street', JSON.stringify({ id: obj.id, name: obj.name }))
        }
    }

    const Get_House = (e) => {
        SetHouse(e)
        let obj = houses.find(element => element.name === e)
        if (obj !== undefined) {
            dispatch(Action_Get_Apartment(obj.id))
            localStorage.setItem('house', JSON.stringify({ id: obj.id, name: obj.name }))
            return
        }
    }

    const Get_Apartment = (e) => {
        SetApartment(e)
        let obj = apartments.find(element => element.name === e)
        if (obj !== undefined) {
            dispatch(Action_Get_Clients_Apartmets_Id(obj.id))
            localStorage.setItem('apartment', JSON.stringify({ id: obj.id, name: obj.name }))
        }
    }

    const streets = useSelector(state => state.adress.streets)
    const houses = useSelector(state => state.adress.houses)
    const apartments = useSelector(state => state.adress.apartments)

    const clients = useSelector(state => state.client.clients)

    const Localstorage_street = (e) => {
        SetStreet(e.name);
        dispatch(Action_Get_House(e.id))
    }

    const Localstorage_house = (e) => {
        SetHouse(e.name);
        dispatch(Action_Get_Apartment(e.id))
    }

    const Localstorage_apartment = (e) => {
        SetApartment(e.name);
        dispatch(Action_Get_Clients_Apartmets_Id(e.id))
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(Action_Get_Streets())
        JSON.parse(localStorage.getItem('street')) && Localstorage_street(JSON.parse(localStorage.getItem('street')));
        JSON.parse(localStorage.getItem('house')) && Localstorage_house(JSON.parse(localStorage.getItem('house')));
        JSON.parse(localStorage.getItem('apartment')) && Localstorage_apartment(JSON.parse(localStorage.getItem('apartment')));
    }, [])

    return (
        <div className='HomePage'>
            <div className="adress_menu">
                <div className="adress_menu_title">
                    {!Street && !House && !Apartment && <p className="adress_menu_title_star">*</p>}
                    <p className="adress_menu_title_" onClick={() => console.log(clients)}>Адрес</p>
                </div>
                <div className="adress_menu_inputs">
                    <div className="homepage_input">
                        <Input placeholder='Улица' name='street' type='text' value={Street} setValue={Get_Street} searchHelper={streets.filter(el => el.cityId === 1)} />
                    </div>
                    <div className="homepage_input">
                        <Input placeholder='Дом' name='house' type='text' value={House} setValue={Get_House} searchHelper={houses} />
                    </div>
                    <div className="homepage_input">
                        <Input placeholder='Кв./офис' name='apartment' type='text' value={Apartment} setValue={Get_Apartment} searchHelper={apartments} />
                    </div>
                </div>
            </div>
            {Street && House && Apartment &&
                <div className="client_menu">
                    <div className="client_adress_and_add_client_button">
                        <p className="client_adress">{`ул. ${Street}, ${House}, ${Apartment}`}</p>
                        <img src={Img_Add_Client} className="add_client" onClick={() => SetWindow_id(1)} />
                    </div>
                    <div className="clients_list">
                        {
                            (Array.isArray(clients) ? clients : []).map((element) => (
                                <div className="clients_list_block">
                                    <div className="clients_list_block_logo_info">
                                        <div>
                                            <p className="clients_name">{element.name}</p>
                                            <p className="clients_phone_number">☎ {element.phone}</p>
                                            {element.email && <p className="clients_email">✉ {element.email}</p>}
                                        </div>
                                    </div>
                                    <div className="clients_list_buttons">
                                        <div className="clients_list_button" onClick={() => dispatch(Action_Delete_Bind_Client(element.bindId, false, false))}><img src={Img_Delete} className="client_list_button_img" /></div>
                                        <div className="clients_list_button" onClick={() => { SetWindow_id(2); SetClient(element) }}><img src={Img_Update} className="client_list_button_img" /></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}
export default HomePage