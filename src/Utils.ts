/**
 * @file utils.ts
 * @description
 * This file contains utility functions that manage the file system data.
 * These functions are responsible for fetching, adding, renaming, deleting, and searching data in the in-memory file structure (`dataDict`).
 * Additionally, functions to set and manage the breadcrumb path and current folder state are included.
 * 
 * Functions include:
 * - Fetching data for a specific folder and its contents
 * - Creating or renaming items in the file system
 * - Deleting items (and recursively deleting children if applicable)
 * - Searching for items by name
 * - Setting the breadcrumb navigation path
 */
import { Data,Path } from './Object.types';
import { dataDict } from './Data';
import { v4 as uuidv4 } from 'uuid';

/**
 * Fetches and sets the immediate children (files/folders) of the given folder ID.
 *
 * @param curr - The current folder ID
 * @param setDataCurr - State setter for updating the current visible data
 */
export function fetchData(curr:string,setDataCurr:React.Dispatch<React.SetStateAction<Data[]>>){
    try{
        let id = curr;
        const showdata = [];
        for(let key of dataDict[id].child){
                showdata.push(dataDict[key]);
        }
        setDataCurr(showdata);
    }catch(e){
        console.error(`An error occured ${e}`);
    }
}

/**
 * Builds and sets the breadcrumb path for a given folder ID.
 *
 * @param id - The current folder ID
 * @param setPath - State setter to update the breadcrumb path
 */
export function setTempPath(id:string,setPath:React.Dispatch<React.SetStateAction<Path[]>>){
    try{
        const tempPath = [];
        while (dataDict[id]) { 
            tempPath.push({ 'name': dataDict[id].name, 'id': id }); 
            id = dataDict[id].parent; 
        }
        tempPath.reverse();
        setPath(tempPath);
    }catch(e){
        console.error(`An error occured ${e}`);
    }
}

/**
 * Adds a new file or folder to the dataDict structure.
 *
 * @param name - Name of the new item
 * @param type - Either "file" or "folder"
 * @param parent - The parent folder ID where the item should be added
 */
export const addItem = (name:string, type:"file" | "folder", parent:string) => {
    try{
        const id = uuidv4();
        const data = {
            id: id,
            name: name,
            type: type,
            child: [],
            parent: parent
        }
        dataDict[parent].child.push(id);
        dataDict[id]=data;
    }catch(e){
        console.error(`An error occured ${e}`);
    }
};

/**
 * Renames an existing item by its ID.
 *
 * @param name - The new name to assign
 * @param id - The ID of the item to rename
 */
export const renameItem = (name:string, id:string) => {
    try{
        dataDict[id].name = name;
    }catch(e){
        console.error(`An error occured ${e}`);
    }
};

/**
 * Deletes an item and all its children (if folder) recursively from dataDict.
 *
 * @param id - ID of the item to delete
 */
export const deleteItem = (id:string)=>{
    try{
        const parent = dataDict[id].parent;
        dataDict[parent].child = dataDict[parent].child.filter(item => item!==id);
        deleteDfs(id);
    }catch(e){
        console.error(`An error occured ${e}`);
    }
};

/**
 * Recursive helper for deleteItem.
 * Removes a node and all its descendants from dataDict.
 *
 * @param id - The ID of the item to delete
 */
const deleteDfs = (id:string)=>{
    try{
        if(dataDict[id].child.length===0)
        {
            delete dataDict[id];
            return;
        }
        for(let item of dataDict[id].child){
            deleteDfs(item);
        }
        delete dataDict[id];
    }catch(e){
        console.error(`An error occured ${e}`);
    }
};

/**
 * Searches for items whose name includes the given string (case-insensitive)
 * and updates the current data view with matched results.
 *
 * @param searchVal - The search query
 * @param setDataCurr - State setter for updating the visible data
 */
export const search = (searchVal:string, setDataCurr:React.Dispatch<React.SetStateAction<Data[]>>)=>{
    try{
        const showdata=[];
        for( const key in dataDict )
        {
            if (dataDict[key].name.toLowerCase().includes(searchVal.toLowerCase())) {
                showdata.push(dataDict[key]);
            }
        }
        setDataCurr(showdata);
    }catch(e){
        console.error(`An error occured ${e}`);
    }
    
}