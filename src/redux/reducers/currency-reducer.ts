import axios from "axios";
import { type } from "os";
import { Dispatch } from "redux";
import { Api, ResponseDataType } from "../../Api/Api";




export type CurrencyType = {
   options: string[]
   oneCurrency: ''
   twoCurrency: ''
   changeRate: number
   amount: number | any
   amountCurrency: boolean
   isLoading: boolean

}

 const initialState: CurrencyType = {
  options: [],
  oneCurrency:'',
  twoCurrency: '',
  changeRate: 0,
  amount: 1,
  amountCurrency: true,
  isLoading: false
}


const GET_ITEMS = 'GET_ITEMS'
const SET_ONE_CURRENCY = 'SET_ONE_CURRENCY'
const SET_TWO_CURRENCY = 'SET_TWO_CURRENCY'
const SET_CHANGE_RATE = 'SET_CHANGE_RATE'
const SET_IS_LOADING = 'SET_IS_LOADING'
const SET_AMOUNT = 'SET_AMOUNT'
const SET_AMOUNT_CURRENCY = 'SET_AMOUNT_CURRENCY'









export const currencyReducer = (state: CurrencyType = initialState, action: any) => {

  switch (action.type) {
    case GET_ITEMS: 
    return {
      ...state,
      options: action.options
    }
    case SET_ONE_CURRENCY:
      return {
        ...state,
        oneCurrency: action.base
      }
    case SET_TWO_CURRENCY: 
    return {
      ...state,
      twoCurrency: action.data
    }
    case SET_CHANGE_RATE: 
    return {
      ...state,
      changeRate: action.data
    }
    case SET_IS_LOADING: 
    return {
      ...state,
      isLoading: action.isLoading
    }
    case SET_AMOUNT:
      return {
        ...state,
        amount: action.amount
      }

    case SET_AMOUNT_CURRENCY:
      return {
        ...state,
        amountCurrency: action.amountCurrency
      }
  
    default:
      return state
  }


  return state
}


type GetItemACType = {
  type: 'GET_ITEMS'
  options: string[]
}

const getItemsAC = (options: string[]): GetItemACType => {
  return {type: GET_ITEMS, options}
}
 
type SetOneCurrencyACType = {
  type: 'SET_ONE_CURRENCY'
  base: string
}


export const setOneCurrencyAC = (base: string): SetOneCurrencyACType => {
   return {type: SET_ONE_CURRENCY, base }
}
 
type SetTwoCurrencyACType = {
  type: 'SET_TWO_CURRENCY'
  data: string
}


export const setTwoCurrencyAC = (data: string): SetTwoCurrencyACType => {
   return {type: SET_TWO_CURRENCY, data }
}

type SetChangeRateACType = {
  type: 'SET_CHANGE_RATE'
  data: number
}

const setChangeRateAC = (data: number): SetChangeRateACType => {
  return {type: SET_CHANGE_RATE, data }
}




type SetIsLoadingACType = {
  type: 'SET_IS_LOADING'
  isLoading: boolean
}

const setIsLoadingAC = (isLoading: boolean): SetIsLoadingACType => {
 return {type: SET_IS_LOADING, isLoading}
}

type SetAmountACType = {
  type: 'SET_AMOUNT'
  amount: number
}

export  const setAmountAC = (amount: number): SetAmountACType => {
  return {type: SET_AMOUNT, amount}
}

type SetAmountCurrencyACType = {
  type: 'SET_AMOUNT_CURRENCY'
  amountCurrency: boolean
}

export const setAmounCurrencyAC = (amountCurrency: boolean): SetAmountCurrencyACType => {
  return {type: SET_AMOUNT_CURRENCY, amountCurrency}
}





export  const getItemsTC = () => {
  return (dispatch: Dispatch) => {
     Api.getOption().then((data: ResponseDataType) => {
       console.log(data)
        const firstCurrency = Object.keys(data.rates)[0];
         dispatch(getItemsAC([data.base, ...Object.keys(data.rates)]));
           dispatch(setOneCurrencyAC(data.base));
           dispatch(setTwoCurrencyAC(firstCurrency));
           dispatch(setChangeRateAC(data.rates[firstCurrency]));
           dispatch(setIsLoadingAC(false));
          
     })     
  }
}


export  const setItemsTC = (oneCurrency:string | number, twoCurrency: string | number) => {
  return (dispatch: Dispatch) => {
    
      Api.setOptions(oneCurrency,twoCurrency)
      //@ts-ignore
         .then((data) => dispatch(setChangeRateAC(data.rates[twoCurrency]))).catch(() => {
           alert( 'Changing the API `base` currency is available for Developer, Enterprise and Unlimited plan clients. Please upgrade, or contact support@openexchangerates.org with any questions.'
           )
         })
            
  }
}

