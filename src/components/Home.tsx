/**
 * @file Home.tsx
 * @description
 * This component manages the core functionality of the application:
 * - Displays the current folder content
 * - Handles navigation using a breadcrumb path
 * - Implements search functionality
 * - Manages and provides context for current folder and visible data
 */
import Content from './Content';
import { currContext, dataCurrContext } from '../Context';
import { dataDict } from '../Data';
import { Data, Path } from '../Object.types'
import React, { useEffect, useState, useMemo } from 'react';
import '../style/Home.css';
import { fetchData, setTempPath, search } from '../Utils';

export default function Home(){
  const [curr, setCurr] = useState<string>('0');
  const [path,setPath] = useState<Path[]>([]);
  const [searchVal, setSearchVal] = useState<string>('');
  const [dataCurr, setDataCurr] = useState<Data[]>([]);

  const currContextValue = useMemo(() => ({ curr, setCurr }), [curr]);
  const dataCurrContextValue = useMemo(() => ({ dataCurr, setDataCurr }), [dataCurr]);

  /**
   * Runs whenever `curr` changes.
   * If we're not in search mode (`curr !== '-1'`), fetch new data,
   * update breadcrumb path, and reset the search field.
   */
  useEffect(()=>{
    if(curr!=='-1'){
        fetchData(curr,setDataCurr);
        setTempPath(curr,setPath);
        setSearchVal('');
    }
  },[curr]);
  
  /**
   * Updates search value on user input.
   * Sets `curr` to `-1` to indicate search mode and resets path to root.
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurr('-1');
    setPath([{ 'name': dataDict[0].name, 'id': '0' }])
    setSearchVal(event.target.value);
  };

  /**
   * Runs whenever `searchVal` changes.
   * Triggers a search if the input is not empty.
   */
  useEffect(()=>{
        if(searchVal!==''){
            search(searchVal,setDataCurr);
        } 
    },[searchVal]);
  
  return (
    <currContext.Provider value={currContextValue} >
    <dataCurrContext.Provider value={dataCurrContextValue} >
        <div className="header">
            <div className="breadcrumb">
                {
                    path.map((item) => {
                        return <span key={item.id} onClick={()=>{setCurr(item.id)}}>{item.name}</span>
                    })
                }
            </div>
            <input className='search' value={searchVal} onChange={handleChange} type='text' placeholder='Search' />
        </div>
        {
        curr!=='-1' &&<button className="backBtn" onClick={()=>setCurr(dataDict[curr].parent)}>&#8617;  Back </button>
        } 
        <Content />
    </dataCurrContext.Provider>
    </currContext.Provider>
  );

}