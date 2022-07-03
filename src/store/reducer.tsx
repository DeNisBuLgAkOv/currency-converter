import {AnyAction, Dispatch} from "redux";
import {api} from "./api";
import {ThunkAction} from "redux-thunk";

export type ActionsType = setDataOneACType
  | setDataTwoACType
  | errorProcessingACType
  | emptyDataACType
  | changeSelectFirstACType
  | changeSelectSecondACType



export type stateType={
  selectFirst: string
  selectSecond: string
  inputValueFirst: string
  inputValueSecond: string
  emptyData:boolean
  messageError:string
}

const initialState:stateType = {
  selectFirst: "RUB",
  selectSecond: "USD",
  inputValueFirst: '',
  inputValueSecond: '',
  emptyData:false,
  messageError:''
}

export type Data ={
  data:{[property:string]:string},
  message:string,
  status:number
}

export const reducer =(state:stateType =initialState ,action:ActionsType ) =>{
    switch (action.type){
      case "SET_SELECT_FIRST":{
        return {...state, inputValueFirst:String((+action.payload.count * +action.payload.course).toFixed(2)) }
      }
      case "SET_SELECT_SECOND":{
        return {...state, inputValueSecond:String((+action.payload.count * +action.payload.course).toFixed(2))}
      }
      case "CHANGE_SELECT_FIRST":{
        return {...state,selectFirst: action.currency}
      }
      case "CHANGE_SELECT_SECOND":{
        return {...state,selectSecond: action.currency}
      }
      case "EMPTY_DATA":{
        return {...state,emptyData:action.emptyData}
      }
      case "ERROR":{
       return  {...state,messageError:action.message}
      }

      default: return state
    }
}

//thunks
export const GetCurrencyOneThunk = (count:string,selectFirst:string,selectSecond:string):ThunkAction<void, stateType, unknown, AnyAction> => {
  return (dispatch: Dispatch<ActionsType>) => {

    api.getExchangeRate(selectFirst,selectSecond)
      .then(res => res.data.status === 200
        ?dispatch(setDataOneAC(count,res.data.data[`${selectFirst}${selectSecond}`]))
        :dispatch(emptyDataAC(true))
      )
      .catch(err =>dispatch(errorPromiseAC(err.message)))
      .finally(()=>dispatch(changeSelectFirstAC(selectFirst)))
  }
}

export const GetCurrencyTwoThunk = (count:string,selectFirst:string,selectSecond:string):ThunkAction<void, stateType, unknown, AnyAction> => {
  return (dispatch: Dispatch<ActionsType>) => {
    api.getExchangeRate(selectFirst,selectSecond)
      .then(res => res.data.status === 200
        ?dispatch(setDataTwoAC(count, res.data.data[`${selectFirst}${selectSecond}`]))
        :dispatch(emptyDataAC(true))
      )
      .catch(err =>dispatch(errorPromiseAC(err.message)))
      .finally(()=>dispatch(changeSelectSecondAC(selectFirst)))
  }
}

//actions
export const setDataOneAC = (count:string,course:string) => {
  return {type: "SET_SELECT_FIRST",payload:{count,course}} as const
}
type setDataOneACType = ReturnType<typeof setDataOneAC>

export const setDataTwoAC = (count:string,course:string) => {
  return {type: 'SET_SELECT_SECOND',payload:{count,course}} as const
}
type setDataTwoACType = ReturnType<typeof setDataTwoAC>

export const changeSelectFirstAC = (currency:string) => {
  return {type: 'CHANGE_SELECT_FIRST',currency }as const
}
type changeSelectFirstACType = ReturnType<typeof changeSelectFirstAC>

export const changeSelectSecondAC = (currency:string) => {
  return {type: 'CHANGE_SELECT_SECOND',currency }as const
}
type changeSelectSecondACType = ReturnType<typeof changeSelectSecondAC>

export const emptyDataAC= (emptyData:boolean) => {
  return {type: 'EMPTY_DATA',emptyData} as const
}
type emptyDataACType = ReturnType<typeof emptyDataAC>

export const errorPromiseAC= (message:string) => {
  return {type: 'ERROR',message} as const
}
type errorProcessingACType = ReturnType<typeof errorPromiseAC>


