/**
 * @file CreateUpdateItem Component
 * @description
 * A modal for creating or renaming files/folders in the current directory.
 * 
 * Features:
 * - Toggle between file and folder creation
 * - Rename existing items
 * - Validates uniqueness of names within current folder
 * - Updates context and refreshes folder view
 * 
 */
import React, { useState, useContext } from 'react';
import '../style/CreateUpdate.css';
import { currContext, dataCurrContext } from "../Context";
import { fetchData, addItem, renameItem } from '../Utils';
import { createUpdateProps } from '../Object.types'

export default function CreateUpdateItem({setOpenModal, contextObjectId, modalType}:createUpdateProps){
  const [asset,setAsset] = useState<'File'|'Folder'>('File');
  const [name,setName] = useState<string>('');
  const [uniqueName,setUniqueName] = useState<boolean>(true);
  const currContextVal = useContext(currContext); 
  const dataCurrContextVal = useContext(dataCurrContext);


  /**
   * Handles renaming an existing item or creating a new item
   * - Ensures the new name is unique
   * - Calls `renameItem` and refreshes data
   */
  const handleSubmit = () => {
    try{
      let isUnique = true;
      if (name.trim()) {
        for(let value of dataCurrContextVal.dataCurr){
          if(value.name===name && value.type===asset.toLowerCase()){
            isUnique=false;
            break;
          }
        }
        if(isUnique===true){
          if(modalType==='Rename'){
            renameItem(name, contextObjectId);
          }else{
            addItem(name, asset==='File' ? "file" : "folder",currContextVal.curr);
          }
          setOpenModal(false);
          fetchData(currContextVal.curr,dataCurrContextVal.setDataCurr);
        }
        setUniqueName(isUnique);
      }
    }catch(e){
      console.error(`An error occured ${e}`);
    }
  };

  const closeModal = ()=>{
    setOpenModal(false);
    setUniqueName(true);
  }

  return (
      <div className="overlay" onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className='modalHeader'>
            <h2>{`${modalType} File/Folder`}</h2>
            <button className="closeButton" onClick={closeModal}>x</button>
          </div>
          {modalType==='Create' && (
            <>
              <div className="modalAssetType">
                <button className={asset==='File'?'asset active file':'asset file'} onClick={()=>setAsset('File')}>File</button>
                <button className={asset==='Folder'?'asset active folder':'asset folder'} onClick={()=>setAsset('Folder')}>Folder</button>
              </div>
            </>
          )}
          <input type='text' value={name} onChange={(e) => {setName(e.target.value);setUniqueName(true);}} placeholder={`Enter New Name`} className='nameInput'/>
          {uniqueName===false && <p className='error'>Please enter a unique name.</p>}
          <button className="createRenameButton" disabled={!name.trim()} onClick={handleSubmit} >{modalType}</button>
        </div>
      </div>
  );
}