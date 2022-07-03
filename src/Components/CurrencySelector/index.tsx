import React, { useState, useCallback, ChangeEvent, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {emptyDataAC, errorPromiseAC} from "../../store/reducer";
import "./Currency.css"

type PropsType={
  startSelect:string,
  updatedCount:string,
  callback:(count:string,currency:string)=>void
}

const CurrencySelector= (props:PropsType) => {
  const [currency,setCurrency]= useState<string>(props.startSelect)
  const [count,setCount]=useState<string>('')

  const dispatch = useDispatch()

  const arr = ["RUB","EUR","USD","JPY","BYN","AED","BTC","GBP","GEL","UAH"]


  useEffect(()=>{
    setCount(props.updatedCount)
  },[props.updatedCount])


  const handleChangeCurrency =useCallback((e:ChangeEvent<HTMLSelectElement>)=>{
    dispatch(emptyDataAC(false))
    dispatch(errorPromiseAC(''))
    setCurrency(e.target.value)
    props.callback(count,e.target.value)

  },[props.callback,currency])

  const handleChangeCount =useCallback((e:ChangeEvent<HTMLInputElement>)=>{
    dispatch(emptyDataAC(false))
    dispatch(errorPromiseAC(''))
    setCount((e.target.value))
    props.callback((e.target.value),currency)

  },[props.callback,count])


  return (
    <div>
      <input value={count} type={"number"}  onChange={handleChangeCount} />
      <select  value={currency}  onChange={handleChangeCurrency} >
        {arr.map(item => <option key={item}>{item}</option>)}
      </select>
    </div>
  );
};

export default CurrencySelector;