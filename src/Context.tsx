/**
 * @file Context.ts
 * @description
 * The contexts are used to share the state across multiple components, allowing 
 * them to access and modify the current folder and its contents.
 */
import { createContext } from "react";
import { Data } from './Object.types';

//Context for managing the current folder state.
export const currContext = createContext<{
    curr:string,
    setCurr:React.Dispatch<React.SetStateAction<string>>
}>({curr:'0',setCurr:()=>{}});

//Context for managing the data of the current folder.
export const dataCurrContext = createContext<{
    dataCurr:Data[],
    setDataCurr:React.Dispatch<React.SetStateAction<Data[]>>
}>({dataCurr:[],setDataCurr:()=>{}});