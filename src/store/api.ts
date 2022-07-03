import axios, { AxiosResponse } from "axios";
import {Data} from "./reducer";

const API_KEY = "b37d7d20cec9c0ea30973d160cc229b7";

const instance = axios.create({
  baseURL: 'https://currate.ru',
});

export const api = {
  getExchangeRate(currentCurrency:string, findCurrency :string) {
    return instance.get<{currentCurrency: string, findCurrency: string }, AxiosResponse<Data>>('/api/', {
      params: {
        get:'rates',
        pairs:`${currentCurrency}${findCurrency}`,
        key: API_KEY,
      }
    });
  }
};

