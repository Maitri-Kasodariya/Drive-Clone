/**
 * @file Data.ts
 * @description 
 * Contains a mock in-memory file system (`dataDict`) used to simulate a hierarchical folder and file structure.
 * Each entry in the object represents a node with properties such as ID, name, type (file/folder), parent reference, and list of children.
 * 
 * This data structure is used throughout the app to mimic folder navigation, search, creation, and deletion operations.
 */

import { DataDict } from './Object.types';
  
export const dataDict: DataDict = {
    0:{
        id:'0',
        name:'My Drive',
        type:'folder',
        child:['1','5'],
        parent:'-1'
    },
    1:{
        id:'1',
        name:'a-folder',
        type:'folder',
        child:['2','3'],
        parent:'0'
    },
    2:{
        id:'2',
        name:'b-folder',
        type:'folder',
        child:['4'],
        parent:'1'
    },
    3:{
        id:'3',
        name:'c-file',
        type:'file',
        child:[],
        parent:'1'
    },
    4:{
        id:'4',
        name:'d-folder',
        type:'folder',
        child:[],
        parent:'2'
    },
    5:{
        id:'5',
        name:'d-folder',
        type:'folder',
        child:[],
        parent:'0'
    }
};

