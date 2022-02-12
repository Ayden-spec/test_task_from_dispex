import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import adressReducers from './adressReducers';
import clientsReducers from './clientsReducers'


const rootReducer = combineReducers({
    adress: adressReducers,
    client: clientsReducers,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))