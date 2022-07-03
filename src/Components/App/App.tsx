import React, {useCallback} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {
  GetCurrencyOneThunk,
  GetCurrencyTwoThunk,
  stateType
} from "../../store/reducer";
import CurrencySelector from "../CurrencySelector";

function App() {

  const countFirst = useSelector<stateType,string>(state =>state.inputValueFirst)
  const countSecond = useSelector<stateType,string>(state=>state.inputValueSecond)
  const selectFirst = useSelector<stateType,string>(state =>state.selectFirst)
  const selectSecond = useSelector<stateType,string>(state =>state.selectSecond)
  const emptyData =useSelector<stateType,boolean>(state => state.emptyData)
  const errorMessage =useSelector<stateType,string>(state => state.messageError)

  const dispatch = useDispatch<any>()

  const firstCurrencySelector=useCallback( (count:string,currency:string)=>{
      dispatch(GetCurrencyOneThunk(count,currency,selectSecond))
  },[dispatch,selectSecond])
  const secondCurrencySelector=useCallback( (count:string,currency:string)=>{
   dispatch(GetCurrencyTwoThunk(count,currency,selectFirst))
  },[dispatch,selectFirst])


  return (
    <div className="App">
      <div className="container">
        <CurrencySelector
          startSelect="RUB"
          updatedCount={countSecond}
          callback={firstCurrencySelector}
        />
        <CurrencySelector
          startSelect="USD"
          updatedCount={countFirst}
          callback={secondCurrencySelector}
        />
      </div>
      {emptyData && <span style={{color:"red"}}>К сожалению, данную конвертацию выполнить  невозможно.Поменяйте валюты!</span>}
      {errorMessage && <div  style={{color:"red"}}>{errorMessage}! Установите расширение Moesif Origin & CORS Changer</div>}
    </div>
  );
}

export default App;
