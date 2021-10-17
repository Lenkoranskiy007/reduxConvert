import axios from "axios"


export type ResponseDataType = {
  base: string;
  disclaimer: string;
  license: string;
  rates: {} | any;
  timestamp: number;
};

type ResponseType = {
  data: ResponseDataType;
};

export const Api =  {
  getOption () {
    //@ts-ignore
   const promise = axios.get(`https://openexchangerates.org/api/latest.json?app_id=02a319ef9b3d4607aef242f676e6752e`).then((res: ResponseType) => {
     return res.data
   })
   return promise
    
  },
  setOptions (oneCurrency:string | number, twoCurrency: string | number) {
    //@ts-ignore
   const promise = axios.get(`https://openexchangerates.org/api/latest.json?app_id=02a319ef9b3d4607aef242f676e6752e&base=${oneCurrency}&symbols=${twoCurrency}`).then((res: ResponseType) => {
     return res.data
     })
   return promise
  }

}