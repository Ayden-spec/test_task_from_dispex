import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Action_Delete_Bind_Client, Action_Post_Client } from '../../actions/Clients'

import Img_Add_Client from '../../assets/images/add_client.png'
import Img_Update from '../../assets/images/update.png'
import Img_Back from '../../assets/images/back.png'

import './Modals.css'



function Add_Client({ window_id, SetWindow_id, Client }) {

    const [Number, SetNumber] = useState('');
    const [Name, SetName] = useState('');
    const [Email, SetEmail] = useState('');

    const [Error, SetError] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (!storage_get_name('street') && !storage_get_name('house') && !storage_get_name('apartment')) {
            SetWindow_id(false)
        }
        if (window_id === 1) {
            SetNumber('');
            SetName('');
            SetEmail('');
        } else {
            SetNumber(Client.phone);
            SetName(Client.name);
            SetEmail(Client.email);
        }
    }, [])

    const storage_get_name = (element) => {
        let el = JSON.parse(localStorage.getItem(element))
        if (el) {
            return el.name
        }
        return false
    }

    const Add_Client_Change = () => {
        if (Number !== '') {
            if (Email !== '') {
                if (Valid_Email(Email)) {
                    dispatch(Action_Post_Client(Name, Number, Email))
                    SetWindow_id(false)
                    return
                } else {
                    SetError('Некорректная почта')
                    return
                }
            }
            dispatch(Action_Post_Client(Name, Number, Email))
            SetWindow_id(false)
        }
        else {
            SetError('Введите номер телефона')
        }
    }

    const Update_Client_Info = () => {
        if (Number !== '' && Client !== {}) {
            if (Email !== '') {
                if (Valid_Email(Email)) {
                    dispatch(Action_Delete_Bind_Client(Client.bindId, true, function () {
                        dispatch(Action_Post_Client(Name, Number, Email))
                    }))
                    SetWindow_id(false)
                    return
                } else {
                    SetError('Некорректная почта')
                    return
                }
            }
            dispatch(Action_Delete_Bind_Client(Client.bindId, true, function () {
                dispatch(Action_Post_Client(Name, Number, Email))
            }))
            SetWindow_id(false)
        }
        else {
            SetError('Введите номер телефона')
        }
    }

    const Valid_Email = (e) => {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        console.log(reg.test(e))
        if (reg.test(e)) {
            return true
        }
        return false
    }
    return (
        <div className="Modal">
            <div className="Modal_header">
                <img src={window_id === 1 ? Img_Add_Client : Img_Update} className="Modal_header_img" />
                <p className="Modal_header_text">{window_id === 1 ? 'Добавить жильца' : 'Редактировать данные'}</p>
                <img src={Img_Back} className="Modal_header_img_back" onClick={() => SetWindow_id(false)} />
            </div>
            {
                `ул. ${storage_get_name('street')}, ${storage_get_name('house')}, ${storage_get_name('apartment')}`
            }
            {
                <p>{Error}</p>
            }
            {window_id === 1 &&
                <div className="add_client_menu">
                    <div className='input margin_top'>
                        <p className="title">Телефон</p>
                        <div className='add_client_menu_number'>
                            <p>+7</p>
                            <input type="text" value={Number} onChange={(e) => SetNumber(e.target.value.replace(/[^0-9]/g, ""))} />
                        </div>
                    </div>
                    <div className='input margin_top'>
                        <p className="title">ФИО</p>
                        <input type="text" value={Name} placeholder='ФИО' onChange={(e) => SetName(e.target.value)} />
                    </div>
                    <div className='input margin_top'>
                        <p className="title">E-mail</p>
                        <input type="text" value={Email} placeholder='E-mail' onChange={(e) => SetEmail(e.target.value)} />
                    </div>
                </div>
            }
            {window_id === 2 &&
                <div className="add_client_menu">
                    <div className='input margin_top'>
                        <p className="title">Телефон</p>
                        <div className='add_client_menu_number'>
                            <p>+7</p>
                            <input type="text" value={Number} onChange={(e) => SetNumber(e.target.value.replace(/[^0-9]/g, ""))} />
                        </div>
                    </div>
                    <div className='input margin_top'>
                        <p className="title">ФИО</p>
                        <input type="text" value={Name} placeholder='ФИО' onChange={(e) => SetName(e.target.value)} />
                    </div>
                    <div className='input margin_top'>
                        <p className="title">E-mail</p>
                        <input type="text" value={Email} placeholder='E-mail' onChange={(e) => SetEmail(e.target.value)} />
                    </div>
                </div>
            }
            <div className="Modal_buttons">
                {window_id === 1 ?
                    <p className="add_client_button" onClick={() => Add_Client_Change()}>Добавить</p> :
                    <p className="add_client_button" onClick={() => Update_Client_Info()}>Отправить</p>
                }
                <p className="back_client_button" onClick={() => SetWindow_id(false)}>отменить</p>
            </div>
        </div>
    )
}

export default Add_Client