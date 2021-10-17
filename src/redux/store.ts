import {applyMiddleware, combineReducers, compose, createStore }  from 'redux'
import thunk from 'redux-thunk'
import { currencyReducer, CurrencyType } from './reducers/currency-reducer';



export type AppStateType = {
currency: CurrencyType
}



const rootReducers  = combineReducers<AppStateType>({
  currency: currencyReducer
})

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store  = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)))
//@ts-ignore
window.__store__  = store

export default store
