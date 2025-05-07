/**
 * @file Object.types.ts
 * @description
 * Defines TypeScript types used across the application to model a virtual file system,
 * including files, folders, their hierarchy, navigation path, and modal props.
 */
export type Data = {
    id: string,
    name: string,
    type: 'folder' | 'file',
    child: string[],
    parent: string
}

export type DataDict = {[key:string]:Data};

export type Path = {
    id: string,
    name: string,
}

export type createUpdateProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  contextObjectId:string,
  modalType: string
}